# Shree Khatu Shyam Ji — Devotional Partner Page (standalone)

This is a trimmed, self-contained copy of ONLY the "About / Devotional Partner"
page from the Beingadot site. It's still a React + Vite + Tailwind app (the
page uses Framer Motion animation, so it can't be a plain static .html file),
but it no longer needs any of the portfolio/homepage code.

## 1. Add your images

These 3 files are referenced by filename but were NOT included in your zip
(the page shows a graceful "ॐ" placeholder if they're missing). Drop them
straight into the `public/` folder, exact filenames:

- `public/shyambaba.jpg`  → the main Khatu Shyam Ji photo
- `public/krishna.png`    → used 4× in the "Divine Inspiration" gallery
- `public/logo.png`       → small round logo in the nav bar / footer

## 2. Install & run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## 3. Build a final file to upload

```bash
npm run build
```

Thanks to `vite-plugin-singlefile` (already configured in `vite.config.ts`),
this outputs ONE self-contained file: `dist/index.html` — all CSS/JS inlined.
You can rename/upload that single file as your "about" or "partner" page
anywhere (just make sure `shyambaba.jpg`, `krishna.png`, and `logo.png` are
uploaded alongside it in the same folder, since images stay as separate
files even in single-file mode).

## What's inside

- `src/components/PartnerPage.tsx` — the actual page content (hero, 10%
  pledge section, purpose/seva-daan-dharma, image gallery, closing note)
- `src/components/Nav.tsx` / `Footer.tsx` — the site header/footer, trimmed
  to only link to sections that exist on this page
- `src/components/Preloader.tsx`, `Cursor.tsx`, `SmartImage.tsx` — supporting
  UI pieces the page depends on
- `src/index.css` — global theme + the devotional-page-only styles (the
  hand-built diya/flame animation, mandala colors, garland, etc.)
- `public/partner.html` — kept for reference; it was only a redirect stub in
  the original multi-page-style app and isn't needed by this trimmed version
