# LokalANI — simplified Vercel-ready mockup

This is a simplified, mobile-first React mockup for **LokalANI**. It was rebuilt from the original zip as a cleaner Vercel-ready interface that follows the provided screenshots more closely: cream background, green LokalANI branding, role-selection cards, three-role community intro, simple dashboard cards, produce listings, and bottom navigation.

## Scope

- Front-end only; no backend, database, authentication, or external API.
- Hardcoded sample data for produce, orders, impact metrics, and roles.
- Responsive behavior: phone-frame preview on desktop, full-screen app on mobile.
- Designed for quick deployment on Vercel through Vite.

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vercel settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

The included `vercel.json` rewrites all routes to `index.html`, so the app can be refreshed safely after deployment.
