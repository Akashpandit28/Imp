# Hey Sis. 🧵❤️

A lightweight, personal Raksha Bandhan website — one scrolling page, no
frameworks, no build tools. Just `index.html`, `style.css`, and `script.js`.

---

## 1. Open it in VS Code

1. Open VS Code.
2. `File → Open Folder…` and select the `rakhi-for-sis` folder.
3. Install the **Live Server** extension (by Ritwick Dey) if you don't have it —
   search for "Live Server" in the Extensions panel.
4. Right-click `index.html` → **Open with Live Server**.

That's it — no `npm install`, no terminal commands. You can also just
double-click `index.html` to open it straight in a browser, though Live
Server gives you auto-refresh while you edit.

---

## 2. Personalize everything from one place

Open **`script.js`**. At the very top is a `CONFIG` object — that's the only
place you need to edit. It controls:

| What | Where in CONFIG |
|---|---|
| Names | `sisterName`, `brotherName` |
| The letter text | `letter` (use `\n\n` for a new paragraph) |
| Sign-off under the letter | `letterSignature` |
| Gallery photos + captions | `photos` (array of `{ src, caption }`) |
| "Things about you" cards | `aboutCards` (array of `{ icon, text }`) |
| Timeline chapters | `timeline` (array of `{ chapter, title }`) |
| Final section lines | `finalLineTop`, `finalLineMain`, `finalLineHappy`, `finalCredit` |
| Final section background photo | `finalBackgroundPhoto` (optional) |
| Background music file | `music` |

You never need to open `index.html` — everything in the list above is
injected into the page automatically by `script.js`.

---

## 3. Replace the photos

1. Drop your own photos into the `images/` folder.
2. Name them to match the `photos` array in `CONFIG` (e.g. `photo1.jpg`,
   `photo2.jpg`…), or change the `src` paths in `CONFIG` to match your own
   filenames.
3. Square-ish photos (roughly 1:1) look best in the Polaroid gallery, but any
   ratio will work since photos are cropped to fit.
4. If a photo file is missing, the site won't break — it just shows a soft
   pink gradient in its place, so you can build the site first and drop
   photos in later.

Want to use one of your own photos as the background of the final section
instead of the default gradient? Set `finalBackgroundPhoto` in `CONFIG` to
its path, e.g. `"images/us-together.jpg"`.

---

## 4. Change the letter and other text

Everything text-related lives in `CONFIG` inside `script.js` (see the table
above). Edit the strings, save, and refresh — Live Server will update
automatically.

---

## 5. Add the music

1. Drop an MP3 file into the `audio/` folder.
2. Make sure `CONFIG.music` in `script.js` points to it, e.g.
   `"audio/rakhi-song.mp3"`.
3. The little music button in the bottom-left corner plays/pauses it. Music
   never autoplays — it only starts when clicked.
4. If you skip this step entirely, the button simply does nothing when
   clicked. No errors, nothing breaks.

---

## 6. Deploy for free with GitHub Pages

**Step by step, using VS Code:**

1. Go to [github.com](https://github.com) and create a new repository named
   `rakhi-for-sis` (public, no README/gitignore needed — you already have
   these files).
2. Open the `rakhi-for-sis` folder in VS Code if it isn't already open.
3. Open the built-in terminal in VS Code (`Terminal → New Terminal`) and
   initialize Git, if this folder isn't a Git repo yet:
   ```bash
   git init
   ```
4. Stage all the files:
   ```bash
   git add .
   ```
5. Commit them:
   ```bash
   git commit -m "First version of the Rakhi website"
   ```
6. Connect your GitHub repository (replace `YOUR-USERNAME` with your GitHub
   username):
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/rakhi-for-sis.git
   ```
7. Push to the `main` branch:
   ```bash
   git branch -M main
   git push -u origin main
   ```
8. On GitHub, open your `rakhi-for-sis` repository, then go to
   **Settings → Pages**.
9. Under "Build and deployment," set **Source** to **Deploy from a branch**.
10. Under "Branch," select **main** and folder **/ (root)**.
11. Click **Save**.
12. Wait a minute or two for GitHub to finish deploying (GitHub shows a
    progress banner while it builds).
13. Refresh the Pages settings tab — GitHub will show you the live URL,
    something like:
    ```
    https://YOUR-USERNAME.github.io/rakhi-for-sis/
    ```
14. Open that URL — your site is live!

Because the site only uses relative paths (`images/photo1.jpg`, not
`/images/photo1.jpg`), it will work correctly under the `/rakhi-for-sis/`
subpath that GitHub Pages uses.

---

## Notes

- No frameworks, no npm, no build step — just HTML, CSS, and vanilla JS.
- Respects `prefers-reduced-motion` for anyone who has that turned on.
- Every animation is CSS transitions/keyframes or `IntersectionObserver` —
  nothing heavier.
- Tested with layouts down to a 360px-wide phone screen and up to large
  desktop monitors.
