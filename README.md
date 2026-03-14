# Iteration Labs

One-page studio site for Iteration Labs, built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

The dev server will print the local URL, typically `http://localhost:5173`.

## Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## What this includes

- A one-page, typography-led landing page for Iteration Labs
- Original copy with manifesto-style positioning
- Three project sections: FamilyOps, Today in Emojis, and Math is Punk
- Hand-authored visual texture using inline SVGs, borders, grain, and restrained motion
- Responsive layout with accessible contrast and semantic structure

## Artistic direction

The site is intentionally minimal and authored rather than corporate. The design uses an off-white paper background, charcoal typography, restrained serif-led hierarchy, subtle sketch-like marks, and imperfect card edges to make the page feel closer to a notebook, manifesto, or art zine than a startup homepage.

## Where to edit copy

- Main page structure: `src/App.tsx`
- Hero, manifesto, and closing copy: `src/components/Hero.tsx`, `src/components/Manifesto.tsx`, `src/components/Closing.tsx`
- Project copy and metadata: `src/content/projects.ts`

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`

### Cloudflare Pages

1. Push this repository to GitHub.
2. Create a new Pages project connected to the repo.
3. Framework preset: `Vite`.
4. Build command: `npm run build`
5. Build output directory: `dist`

### Cloudflare Pages via GitHub Actions

This repository includes a production deploy workflow at `.github/workflows/deploy-cloudflare-pages.yml`.

It runs on every push to `main`, which means a merged pull request to `main` will trigger a new Cloudflare Pages deployment.

Set these before using the workflow:

- GitHub secret: `CLOUDFLARE_API_TOKEN`
- GitHub secret: `CLOUDFLARE_ACCOUNT_ID`
- GitHub repository variable: `CLOUDFLARE_PAGES_PROJECT_NAME`

Cloudflare's current recommended GitHub Actions approach uses `cloudflare/wrangler-action@v3` with a direct `pages deploy dist` command.
