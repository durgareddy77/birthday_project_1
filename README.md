# Birthday Web Card

Small interactive birthday card built with plain HTML, CSS and JavaScript.

Contents
- `birth.html` — main page
- `app.js` — app logic (passcode, screens, webcam snapshot)
- `styles.css` — styles
- `images/`, `music/`, `videos/` — assets

Quick start
1. Open the page directly in a browser (double-click `birth.html`).
   - For media and webcam features a local server is recommended so the browser serves correct MIME types and allows getUserMedia.

2. To run a simple local server (recommended):

```bash
# from project root (Windows/macOS/Linux)
python -m http.server 8000
# then open http://localhost:8000/birth.html
```

Features
- **Passcode protection:** 4-digit PIN required to unlock the card (default: `1234`).
- **Cake animation:** Blow out candles and reveal a birthday message.
- **Gifts:** Three interactive gift options:
  - *Camera*: webcam snapshot feature to capture two photos for the scrapbook.
  - *Bottle*: personalized scrapbook/collage message with captured photos.
  - *Star*: video gift (cloud-hosted on Cloudinary).
- **Video playback:** Videos are embedded with standard `<video>` controls.

Notes
- The passcode is defined in `app.js` as `CORRECT_PIN` — change it to customize.
- The main page (screen4) video is sourced locally from `music/mywish.webm` as a `<video>` tag (not an iframe).
- The "star" gift video is cloud-hosted on Cloudinary: `https://res.cloudinary.com/dukhnxk98/video/upload/v1779733525/mywish_d72fci.webm`
- The app requires browser permissions for:
  - Camera/webcam access (for the "camera" gift snapshots).
- Autoplay behavior: videos may require user interaction or muting depending on browser policy.

To customize
- **Passcode:** Edit `CORRECT_PIN` in `app.js`
- **Video source:** Replace Cloudinary URL or local file path in `app.js` (both video sections).
- **Images/text:** Update `birth.html` and `app.js` with your own content.
