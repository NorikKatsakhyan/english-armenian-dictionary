# English–Armenian Dictionary website

This is a static, searchable English–Armenian dictionary website made from the supplied Excel workbook.

## Files
- `index.html` — website page
- `styles.css` — design and responsive layout
- `dictionary.json` — 10,809 dictionary entries

## Run locally
Open `index.html` in a modern browser. For best results, serve this folder through a local web server (for example, VS Code Live Server), because browsers may restrict loading the JSON file directly from a `file://` URL.

## Publish free with GitHub Pages
1. Sign in or create a free account at https://github.com/.
2. Create a new **public** repository, for example `english-armenian-dictionary`.
3. Upload all four website files (`index.html`, `styles.css`, `app.js`, `dictionary.json`) to the repository root.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`, then click **Save**.
7. Wait for GitHub Pages to publish. Your site will be available at `https://YOUR-USERNAME.github.io/english-armenian-dictionary/`.

## Notes
- The workbook contains English headwords, Armenian-script pronunciation guides, and Armenian definitions. The website displays all three.
- The pronunciation guide in the workbook is displayed as text.
- The source workbook credits Norik Katsakhyan. Before publishing the dictionary publicly, make sure you have permission to publish and distribute its contents.
- This is a static site: visitors do not need accounts and there is no server/database bill. To update entries, replace `dictionary.json` with a newly exported JSON file using the same fields (`word`, `pronunciation`, `definition`).
