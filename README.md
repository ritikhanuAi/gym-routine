# Gym Routine

A glassmorphism-inspired weekly workout tracker built with Next.js and optimized for static deployment on Netlify.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Netlify deployment

This project is configured for static export, so it can be deployed directly on Netlify without a server backend.

1. Push this repo to GitHub.
2. In Netlify, select Add new site -> Import an existing project.
3. Use the repo as the source.
4. Set the publish directory to `out` if Netlify asks for it.
5. Keep the build command as `npm run build`.

## Notes

- Progress is saved in the browser with `localStorage`.
- The weekly checklist resets automatically when the ISO week changes.
- The layout uses a glassmorphism design language to create a soft frosted-glass UI.
