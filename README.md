# Agesto — Creative Digital Agency (Demo)

A lightweight single-page marketing site for a creative digital agency. This repository contains the frontend source: an HTML page, custom CSS, JavaScript for interactivity, and image assets.

## Features

- Floating glassmorphism navbar with light/dark theme support
- Smooth scrolling and active-section highlighting
- Responsive layout with mobile navigation
- Hero, About, Services, Portfolio, Process, Testimonials, Team, Contact sections
- Contact form (mock behavior), floating/animated elements, AOS animations
- Team cards using a shared `images/people.jpg` image
- Favicon set to `images/logo.png`

## Tech

- HTML5
- Tailwind CSS (built with PostCSS)
- Vanilla JavaScript
- AOS (Animate On Scroll)
- Font Awesome icons

## File structure

```
/ (project root)
├─ index.html         # Main single-page site
├─ styles.css         # Custom styles and overrides
├─ script.js          # Interactivity (theme toggle, nav, form handlers)
├─ package.json       # npm scripts and dependencies
├─ postcss.config.cjs # PostCSS configuration
├─ tailwind.config.cjs # Tailwind configuration
├─ src/
│  └─ input.css       # Tailwind entry point
├─ dist/
│  └─ styles.css      # Built CSS (generated)
├─ images/
│  ├─ logo.png        # Favicon / brand logo
│  ├─ img.png         # Example imagery used across the site
│  └─ people.jpg      # Shared team member image
├─ README.md          
└─ .gitignore         # Git ignore rules
```

## Run locally (Windows PowerShell)

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Build CSS:

   ```powershell
   npm run build:css
   ```

3. Start a simple static server:

   ```powershell
   python -m http.server 8000
   ```

4. Open your browser and visit `http://localhost:8000`.

## Development

For development with auto-rebuild:

```powershell
npm run watch:css
```

This will watch for changes and rebuild CSS automatically.

## Deployment

This is a static site, so deployment is simple:

1. Build the CSS:

   ```powershell
   npm run build:css
   ```

2. **Upload only these files to your static host:**
   - `index.html`
   - `script.js`
   - `dist/styles.css`
   - `images/` folder
   - All external assets (AOS, Font Awesome) are loaded via CDN

**Do NOT upload:**
- `package.json` (only needed for development)
- `package-lock.json` (only needed for development)
- `node_modules/` (only needed for development)
- `src/` (source files, already built into `dist/`)
- `postcss.config.cjs`, `tailwind.config.cjs` (build config, not needed at runtime)

## Development notes

- `styles.css` contains custom theme variables and overrides (glassmorphism, input backgrounds, nav link color fixes). If you change CSS variables, check both light and dark modes.
- `script.js` stores theme preference in `localStorage` and toggles the `dark` class on the root element.
- Team member images were intentionally unified to `images/people.jpg`. Replace with per-person photos by updating the `src` in `index.html`.

---