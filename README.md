# 🚀 VYNTAX — Enhanced Version

This repo contains the **enhanced** Vyntax personal website with:
- Live animated canvas backgrounds (per-page)
- Scroll-triggered animations (GSAP + ScrollTrigger) on the homepage
- Improved About page layout + responsiveness
- Updated styling (hero divider removed, transparent mesh wrapper so the live background stays visible)

---

## 🌐 Live Site
- https://vyntax960.netlify.app/

---

## ✨ What’s Included

### 1) Live Backgrounds (Canvas)
Different pages use different canvas backgrounds:

- **Home (`index.html`)**  
  `#geometric-bg` → animated geometric network glow background

- **About (`about.html`)**  
  `#grid-canvas` → animated grid wave background

- **Blog (`blog.html`)**  
  `#hyperspeed-canvas` → hyperspeed starfield background

> All canvases are styled as fixed full-screen backgrounds with `pointer-events: none`, so they never block clicks.

---

### 2) Scroll Animations (Homepage)
On the homepage, elements animate smoothly as you scroll:

- Section headers: `.fade-in-scroll`
- Tool cards: `.slide-in-left` / `.slide-in-right`
- Snippet cards: `.scale-in`
- Resource + component cards: `.slide-in-bottom`
- Hero parallax: `.hero-visual` (scrubbed with scroll)

These are powered by:
- `GSAP`
- `ScrollTrigger`

CDNs are loaded in `index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

---

### 3) Developer Tools + Generators (Home)
Interactive tools are implemented in `script.js`:
- CSS Box Shadow Generator
- CSS Gradient Generator
- Glassmorphism Generator
- Color Palette Generator
- Lorem Ipsum Generator
- Password Generator
- JS Keycode Finder

---

### 4) Snippets + Resources
The homepage also includes:
- Snippet cards with one-click copy
- Resources hub (design / APIs / icons / dev tools)
- Cheat sheets accordion
- Component library
- Learning roadmap

---

## 🧩 Key Files

- `index.html` — main landing page (tools, snippets, resources, etc.)
- `style.css` — global styling + canvas background behavior + layout fixes
- `script.js` — tools logic, scroll animations, canvas backgrounds
- `about.html` — About page using `#grid-canvas`
- `blog.html` — Blog page using `#hyperspeed-canvas`
- `contact.html` — Contact page
- `ANIMATIONS-GUIDE.md` — explanation of scroll animations + how to customize

---

## 🖼️ Images / Assets
Make sure these exist in your site root (same folder as HTML files), or update the paths accordingly:
- `vyntax-logo.png`
- `Aviral.jpeg` (About page profile image)

> Filenames are **case-sensitive** on Netlify.

---

## ✅ How to Run Locally
Just open `index.html` in a browser.

For best results (especially for fetch/caching/debugging), use a local server:
```bash
# VS Code Live Server extension (recommended)
# or:
python -m http.server 5500
```
Then open:
- http://localhost:5500

---

## 🚀 Deploy (Netlify)
If connected to GitHub:
1. Commit + push to `main`
2. Netlify auto-deploys

---

## ♿ Accessibility / Performance Notes
- Background canvases have `pointer-events: none`
- Backgrounds respect:
  - `prefers-reduced-motion: reduce` (canvas is hidden)
- DevicePixelRatio is capped (helps performance on high-DPI screens)

---

## 🛠️ Customization

### Adjust scroll animation timing
In `script.js` → `initScrollAnimations()`:
- `duration` controls speed
- `start: 'top 85%'` controls when animation triggers
- `toggleActions` controls replay / reverse on scroll

### Tuning canvas background density
In `script.js` → `initGeometricBackground()`:
- `nodeCount`
- `linkDist`
- `maxSpeed`

---

## 📌 Notes
This repo is intentionally kept **framework-free** (HTML/CSS/JS) to stay fast, lightweight, and easy to customize.

---

## 👤 Author
Aviral Sahu  
GitHub: https://github.com/Aviralsahu960  
LinkedIn: https://www.linkedin.com/in/aviral-sahu-vyntaxdev/
