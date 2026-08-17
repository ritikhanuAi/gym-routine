# Weekly Training Log

A static checklist site for your 6-day Push/Pull/Legs split. Check off each
exercise as you complete it — progress is saved in your browser and
automatically starts fresh every week (no login, no backend).

## How the weekly reset works

Your checkmarks are stored in the browser under a key that includes the
current ISO week number (e.g. `2026-W34`). Once Monday of a new week
arrives, the app looks for a new key, finds nothing saved yet, and the
checklist opens empty — a true reset with no scheduled job required. There's
also a manual **"Reset this week"** button if you want to clear it early.

Note: progress is stored per-browser (`localStorage`), so it won't sync
across devices — each phone/laptop keeps its own checklist.

## Deploy to Netlify

**Fastest — drag and drop (no account setup beyond signing in):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this whole folder onto the page
3. Netlify gives you a live URL immediately (you can rename the site or add
   a custom domain from the site settings)

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
cd path/to/this-folder
netlify deploy --prod
```

**Via GitHub (auto-redeploys on every push):**
1. Push this folder to a new GitHub repo
2. In Netlify: **Add new site → Import an existing project → GitHub**
3. Pick the repo — no build command needed, publish directory is `.`
4. Deploy

No build step, no environment variables, no dependencies — it's a plain
HTML/CSS/JS static site.
