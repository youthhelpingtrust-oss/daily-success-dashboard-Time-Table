# Daily Success Dashboard

A mobile-first personal productivity dashboard — discipline tracking, NGO and
office metrics, health charts, a smoking-reduction program, journaling, and a
weekly report. Pure HTML/CSS/JS, installable as a PWA, works fully offline,
no backend, no login, no paid services. All data stays in your browser's
`localStorage` on your own device.

## Files

```
index.html         the app shell (loads everything else)
style.css           all styling — light/dark theme, mobile-first responsive
app.js              all app logic (vanilla JS, no framework, no build step)
manifest.json        PWA metadata (name, icons, colors)
service-worker.js    caches the app for offline use + installability
icons/icon-192.png   app icon
icons/icon-512.png   app icon
```

Keep this exact folder structure — `manifest.json`, `service-worker.js`, and
the `icons/` folder are referenced by relative path, so they need to stay
next to `index.html`.

## Deploy to GitHub Pages (free, 5 minutes)

1. Create a new **public** GitHub repository, e.g. `daily-success-dashboard`.
2. Upload all the files above, preserving the folder structure (the `icons`
   folder should be a real subfolder, not flattened).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. Wait about a minute, then visit:
   `https://<your-username>.github.io/<repo-name>/`

That's it — no build step, no `npm install`, nothing else to configure.

## Installing it as an app

- **iPhone / iPad (Safari):** open the site, tap the **Share** icon, then
  **Add to Home Screen**. It will open full-screen like a native app.
- **Android / Chrome / Desktop Chrome / Edge:** open the site and look for an
  **Install** icon in the address bar, or use the **Install** button that
  appears inside the app's **More → Settings** panel.

## Updating the site later

Whenever you change `index.html`, `style.css`, `app.js`, or the icons and
re-upload to GitHub, **also bump the cache name** at the top of
`service-worker.js`:

```js
var CACHE_VERSION = 'dsd-cache-v1';   // change to 'dsd-cache-v2', etc.
```

This is the one thing people forget with PWAs: without bumping this version
string, returning visitors keep seeing the **old cached version**, because
the service worker is intentionally offline-first. Changing the string tells
every visitor's browser "a new version exists, replace your cached copy."

## Data, backups, and privacy

- All entries (daily score, routine, NGO/office numbers, health log, journal,
  settings) are saved automatically to `localStorage` in the visitor's own
  browser — nothing is sent to any server.
- **Export Backup (JSON)** in Settings downloads a full snapshot you can keep
  safe or move to another device/browser.
- **Import Backup (JSON)** restores from that file (it replaces current data
  after a confirmation prompt).
- **Reset All Data** wipes everything on that device after a confirmation
  prompt.
- Because storage is per-browser, data does **not** sync automatically
  between your iPhone, iPad, and laptop — use Export/Import to move a backup
  between them if you want the same numbers everywhere.

## Notifications — what to expect

The four daily reminders (wake up, exercise, planning, sleep) show as
in-app banners whenever the dashboard is open, and as real system
notifications if you tap **Enable browser notifications** and keep the tab
open in the background. Since this is a backend-free static site, it can't
send notifications while the app is fully closed (that would require a push
server). For guaranteed alerts, also set these times in your phone's native
Reminders or Alarm app.

## Browser support

Built with standard HTML5/CSS3/ES2017 JavaScript — works on current Safari
(iOS/iPadOS), Chrome, Edge, and Firefox. Service workers require HTTPS,
which GitHub Pages provides automatically.

## Local testing before deploying

Opening `index.html` directly via `file://` won't register the service
worker (browsers block that for security). To test locally first, run a
simple local server from this folder, e.g.:

```bash
python3 -m http.server 8080
```

then visit `http://localhost:8080` in your browser.
