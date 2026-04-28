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
├── brand-assets/               # Master brand files (SVG, PNG, JPG)
│   ├── final_LOGO/
│   ├── final_ICON/
│   └── final_WORDMARK/
├── public/                     # Static files served as-is
│   ├── 404.html                # SPA redirect for GitHub Pages
│   ├── favicon.ico
│   ├── og-image.png
│   └── brand/                  # Logos used by the site
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

| Name         | Hex       |
| ------------ | --------- |
| Navy         | `#1C325A` |
| Sunset orange| `#FBB040` |
| Hot pink     | `#EA0A8C` |
| Light grey   | `#EEEEEF` |

### Fonts

- **Porcelain** (headlines) — loaded via Adobe Typekit kit `awa3yvm`
- **Poppins** (body) — loaded via Google Fonts

> ⚠️ **Typekit domain authorization required.** Porcelain only loads on domains added to the Typekit kit. When deploying to a new URL (GitHub Pages subdomain or custom domain), log into Adobe Fonts → Kits → kit `awa3yvm` → Domains, and add the new hostname. Otherwise the headline font silently falls back.

### Taglines

- _Play like a kid. Party like an adult._
- _Play by day, party by night._
- _Adults deserve recess too._

The full brand guide lives in `brand-assets/AfterHoursBrandGuide.pdf`.

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
- Brand identity and copy by **Afterhours** (founder: Abi Carter)
- Some imagery sourced from [Unsplash](https://unsplash.com) under the Unsplash license
- UI components originally based on [shadcn/ui](https://ui.shadcn.com/) (MIT)

---

## License

© Afterhours. All rights reserved.

This repository is private to the Afterhours project. The brand name, logo, and visual identity are the property of Afterhours and not licensed for reuse.
