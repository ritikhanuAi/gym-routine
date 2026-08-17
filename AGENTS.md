# Frontend Rules and Structure

## Purpose
This project is a simple fitness tracking front-end used to log weekly workouts, persist progress locally, and stay easy to deploy to static hosting platforms like Netlify.

## Core standards
- Use Next.js App Router for all frontend pages and layouts.
- Keep components small, readable, and single-purpose.
- Prefer semantic HTML and accessible controls.
- Keep logic and rendering clear; avoid hiding business rules inside complicated hooks.
- Use CSS variables for palette, spacing, and component tokens.
- Use client-side state only where required for browser features like `localStorage`.
- Preserve a static export-friendly setup so the app can be deployed to Netlify without a server backend.

## Code quality rules
- Use descriptive variable names.
- Prefer immutable updates when working with React state.
- Avoid unnecessary dependencies and keep the project lightweight.
- Keep the app mobile-first and responsive.
- When editing the workout split, update both the schedule data and any visually relevant labels consistently.
- Ensure any browser-only code is guarded before accessing `window`, `localStorage`, or document APIs.

## Structure
- `app/` contains pages, layouts, and app-level styling.
- `components/` is reserved for reusable UI blocks when the page grows beyond one file.
- `lib/` is reserved for shared helper logic and data transforms.
- Keep static content and training data grouped by feature instead of dispersing it across the codebase.

## Deployment expectations
- The app must remain compatible with static hosting.
- No secret keys or backend configuration should be required for the default local development flow.
- Prefer build-time config and browser-only logic when possible.
