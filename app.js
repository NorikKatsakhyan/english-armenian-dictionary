let dictionary=[];
let matches=[];
let shown=0;
const PAGE_SIZE=30;
const input=document.getElementById("search");
const results=document.getElementById("results");
const title=document.getElementById("results-title");
const subtitle=document.getElementById("results-subtitle");
const more=document.getElementById("load-more");
const sort=document.getElementById("sort");
const norm=s=>String(s||"").toLocaleLowerCase().normalize("NFKC").trim();

fetch("dictionary.json").then(r=>{if(!r.ok)throw new Error("Could not load dictionary data");return r.json()})
.then(data=>{dictionary=data;document.getElementById("entry-count").textContent=`${data.length.toLocaleString()} entries`;})
.catch(()=>{document.getElementById("entry-count").textContent="Dictionary data unavailable";results.innerHTML='<div class="empty-state"><strong>Could not load the dictionary.</strong><span>Make sure dictionary.json is in the same folder as this page.</span></div>';});

function search(q){
 const query=norm(q);
 if(!query){matches=[];shown=0;title.textContent="Dictionary entries";subtitle.textContent="Start typing to search the dictionary.";render();return;}
 const scored=[];
 for(const e of dictionary){
   const w=norm(e.word), p=norm(e.pronunciation), d=norm(e.definition);
   let score=999;
   if(w===query)score=0;
   else if(w.startsWith(query))score=1;
   else if(w.includes(query))score=2;
   else if(p.includes(query))score=3;
   else if(d.includes(query))score=4;
   if(score<999)scored.push({e,score});
 }
 if(sort.value==="az")scored.sort((a,b)=>a.e.word.localeCompare(b.e.word));
 else scored.sort((a,b)=>a.score-b.score||a.e.word.localeCompare(b.e.word));
 matches=scored.map(x=>x.e);shown=0;
 title.textContent=`Search results`;
 subtitle.textContent=`${matches.length.toLocaleString()} ${matches.length===1?"match":"matches"} for “${q}”`;
 render();
}
function render(){
 if(!matches.length){
   results.innerHTML=input.value.trim()?'<div class="empty-state"><div class="empty-icon">⌕</div><strong>No matching words found.</strong><span>Check the spelling or try a shorter search.</span></div>':'<div class="empty-state"><div class="empty-icon">⌕</div><strong>Your next word is waiting.</strong><span>Search above to explore the dictionary.</span></div>';
   more.hidden=true;return;
 }
 const slice=matches.slice(shown,shown+PAGE_SIZE);
 const frag=document.createDocumentFragment();
 slice.forEach(e=>{
   const card=document.createElement("article");card.className="entry";
   const top=document.createElement("div");top.className="entry-top";
   const left=document.createElement("div");
   const h=document.createElement("h3");h.className="word";h.textContent=e.word;left.appendChild(h);
   if(e.pronunciation){const p=document.createElement("p");p.className="pronunciation";p.textContent=`Pronunciation: ${e.pronunciation}`;left.appendChild(p);}
   const speak=document.createElement("button");speak.className="speak";speak.type="button";speak.title=`Hear ${e.word}`;speak.setAttribute("aria-label",`Hear pronunciation of ${e.word}`);speak.textContent="🔊";
   speak.addEventListener("click",()=>{if(!("speechSynthesis" in window)){alert("Speech playback is not supported in this browser.");return;}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(e.word);utterance.lang="en-US";speechSynthesis.speak(utterance);});
   top.append(left,speak);card.appendChild(top);
   const def=document.createElement("p");def.className="definition";def.textContent=e.definition;card.appendChild(def);
   frag.appendChild(card);
 });
 results.replaceChildren(frag);
 shown+=slice.length;
 more.hidden=shown>=matches.length;
 more.textContent=`Show more (${(matches.length-shown).toLocaleString()} remaining)`;
}
let debounce;
input.addEventListener("input",()=>{document.getElementById("clear").style.visibility=input.value?"visible":"hidden";clearTimeout(debounce);debounce=setTimeout(()=>search(input.value),100);});
document.getElementById("search-form").addEventListener("submit",e=>{e.preventDefault();search(input.value);});
document.getElementById("clear").addEventListener("click",()=>{input.value="";input.focus();search("");document.getElementById("clear").style.visibility="hidden";});
document.querySelectorAll(".example").forEach(b=>b.addEventListener("click",()=>{input.value=b.dataset.word;search(input.value);input.focus();}));
more.addEventListener("click",render);
sort.addEventListener("change",()=>{if(input.value.trim())search(input.value);});
document.getElementById("clear").style.visibility="hidden";
