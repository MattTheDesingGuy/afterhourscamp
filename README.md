# Afterhours

> **Play by day, party by night.**

The website for [Afterhours](https://afterhourscamp.com.au) — adults‑only weekend camp retreats in Victoria, Australia.

🌐 **Live site:** _coming soon_ — `https://<username>.github.io/afterhours/`

---

## About the project

Afterhours brings back the magic of school camp for grown‑ups: zip lines, archery, slip 'n' slide kickball, and themed parties every night. This repo is the marketing site — four pages (Home, Tickets, Gallery, Contact), with ticket purchases handled externally via Humanitix.

The site originated as a [Figma Make](https://www.figma.com/make/) export, then was cleaned up and prepared for static hosting on GitHub Pages.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite 6** — build tool
- **Tailwind CSS v4** — styling
- **react-router v7** — client‑side routing
- **lucide-react** — icons
- **motion** — animations
- **GitHub Pages** + **GitHub Actions** — hosting & deploy

---

## Quick start

**Requirements:** Node 20+ and npm 10+.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deploy pipeline
├── brand-assets/               # Master brand archive (SVG, PNG, JPG)
│   ├── final_LOGO/             # — committed for reference, NOT bundled
│   ├── final_ICON/
│   └── final_WORDMARK/
├── public/                     # Static files served as-is
│   ├── 404.html                # SPA redirect for GitHub Pages
│   ├── favicon.ico
│   ├── favicon-32.png
│   ├── favicon-192.png
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   └── brand/                  # Logos used by the live site
│       ├── icon-gradient.svg   # nav bar
│       └── full-white-logo.svg # footer
├── src/
│   ├── app/
│   │   ├── components/         # Layout, Navigation, Footer, Button
│   │   ├── pages/              # Home, Tickets, Gallery, Contact
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── assets/                 # Page imagery (WebP)
│   ├── styles/                 # fonts, tailwind, theme variables
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

---

## Brand reference

These values are baked into `src/styles/theme.css` — change them there if needed, not inline.

### Colours

| Name             | Hex       | Notes |
| ---------------- | --------- | ----- |
| Web navy         | `#050B2F` | Used across the site (nav, footer, dark backgrounds) |
| Sunset orange    | `#FBB040` | Accent / hover states |
| Hot pink         | `#EA0A8C` | Accent / gradient endpoint |
| Light grey       | `#EEEEEF` | Backgrounds, dividers |

> **Note on navy:** the brand guide PDF lists navy as `#1C325A`. The web build uses a deeper `#050B2F` — this is intentional, chosen for stronger contrast in digital surfaces and for the gradient-icon-on-navy combination used in the navigation. Print collateral can continue to use `#1C325A` as per the brand guide.

### Fonts

- **Gochi Hand** (headlines) — Google Fonts, single weight (400). Loaded via `src/styles/fonts.css`.
- **Poppins** (body) — Google Fonts, weights 400 / 600 / 700.

> **Note on headline weight:** Gochi Hand only ships in Regular (400). Do not apply `font-bold`, `font-semibold`, or `font-extrabold` to headline elements — the browser will synthesise a fake bold which distorts the hand‑drawn letterforms. Use size and colour for hierarchy instead.

### Taglines

- _Play like a kid. Party like an adult._
- _Play by day, party by night._
- _Adults deserve recess too._

The full brand guide lives in `brand-assets/AfterHoursBrandGuide.pdf`.

### Logo files used by the site

The full master archive is in `brand-assets/`. The site itself only uses these specific files (copied into `public/brand/`):

| Site location | File |
|---|---|
| Nav bar (48×48 on navy) | `public/brand/icon-gradient.svg` (← `final_ICON/SVG/ICON-Gradient.svg`) |
| Footer (120×120 on navy) | `public/brand/full-white-logo.svg` (← `final_LOGO/SVG/FULL-White-Logo.svg`) |
| Favicon (16/32/192) | Generated from `final_ICON/SVG/ICON-Gradient.svg` |
| Apple touch icon (180×180) | Generated from `final_ICON/PNG/ICON-Gradient-on-navy_PNG.png` |
| OG share image (1200×630) | Generated from `final_LOGO/PNG/FULL-Gradient-Logo-on-navy_PNG.png` |

---

## Deployment

Deployment is automated via GitHub Actions. Every push to `main` builds the site and publishes it to GitHub Pages.

### One‑time setup

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main`. The first deploy will take 1–2 minutes.

### Project page vs. custom domain

The Vite `base` path is controlled by the `VITE_BASE_PATH` env var, set in `.github/workflows/deploy.yml`.

- **Project page** (e.g. `username.github.io/afterhours/`):
  Set `VITE_BASE_PATH=/afterhours/` in the workflow.
  Set `pathSegmentsToKeep = 1` in `public/404.html`.

- **Custom domain or root user/org page** (e.g. `afterhourscamp.com.au`):
  Set `VITE_BASE_PATH=/` in the workflow.
  Set `pathSegmentsToKeep = 0` in `public/404.html`.
  Add a `public/CNAME` file containing the domain (e.g. `afterhourscamp.com.au`).
  Configure DNS at the domain registrar (CNAME or ALIAS to `username.github.io`).

### How client‑side routing works on Pages

GitHub Pages doesn't natively support SPAs — going directly to `/tickets` would 404. We use the [rafgraph SPA pattern](https://github.com/rafgraph/spa-github-pages):

1. `public/404.html` catches any unknown URL, encodes the path into the query string, and redirects to `index.html`.
2. A small inline script in `index.html` decodes that query string and rewrites the URL back to the proper path before React Router boots.

Result: clean URLs work, refresh works, share links work — no `#` in URLs.

---

## Development notes

### Adding a new image

1. Drop the source file into `src/assets/`.
2. Convert to WebP at appropriate sizes (use `sharp-cli` or [Squoosh](https://squoosh.app)). Keep originals out of the bundle — only ship WebP.
3. Import like any module:
   ```tsx
   import myImage from '../assets/my-image.webp';
   ```
4. For the hero or other large images, generate 800w / 1280w / 1920w variants and use `<picture>` with `srcset`.

### Adding a new page

1. Create a new component in `src/app/pages/`.
2. Register it in `src/app/routes.tsx`.
3. Add a link in `src/app/components/Navigation.tsx` and (if relevant) `Footer.tsx`.

### Tailwind / theme

Tailwind v4 uses CSS variables defined in `src/styles/theme.css`. Use brand tokens (`var(--sunset-orange)`, `var(--deep-navy)` etc.) instead of hex values directly in components — keeps colours consistent and makes future theme tweaks one‑file changes.

---

## Credits

- Built by **Matt** ([@yourhandle](https://github.com/)) — web design & development
- Brand identity by **Afterhours** (founder: Abi Carter)
- Some imagery sourced from [Unsplash](https://unsplash.com) under the Unsplash license

---

## License

© Afterhours. All rights reserved.

This repository is private to the Afterhours project. The brand name, logo, and visual identity are the property of Afterhours and not licensed for reuse.
