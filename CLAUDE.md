# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Jeckonia Opiyo Ochieng's personal portfolio, rebuilt as a Next.js (App Router) application with a custom admin CMS. Content (profile, skills, services, portfolio items, testimonials, blog posts, contact info, site settings) lives in SQLite via Prisma and is edited through `/admin`, not hardcoded in markup. The original static HTML/CSS/JS version has been archived to the `legacy/static-site` branch — see "Legacy static site" below.

## Commands

```
npm run dev            # start dev server (Turbopack) at localhost:3000
npm run build           # production build
npm run start            # run a production build
npm run lint              # eslint

npx prisma studio          # browse/edit the SQLite DB directly
npx prisma migrate dev --name <name>   # create + apply a migration after editing schema.prisma
npx prisma generate           # regenerate the client (into app/generated/prisma) after a schema change
npx prisma db seed           # re-run prisma/seed.ts against the current DB
```

There is no test suite configured. Verify changes by running `npm run build` (catches type errors across Server/Client Components) and by exercising the affected page(s) via the dev server.

## Architecture

### Stack
Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + Prisma 7 (SQLite via the `@prisma/adapter-better-sqlite3` driver adapter — Prisma 7 requires an explicit driver adapter, there's no more bundled query engine) + NextAuth.js (Credentials provider, JWT sessions) + Tiptap (blog rich text) + react-icons (`fa6` set).

### Data model (`prisma/schema.prisma`)
One row per content entity, fetched via typed helpers in `lib/content.ts` (each wrapped in React's `cache()` so Header/Footer/etc. sharing the same query within one request only hit the DB once). Notable design choices, not obvious from the schema alone:
- `Profile` and `SiteSettings` are **singletons** — always queried/written with `id: "singleton"`.
- `Skill` is one unified model (`category` TECHNICAL/PROFESSIONAL, nullable `percent`/`iconUrl`) rather than three separate lists, so a skill can be a progress bar, an icon badge, or both from one row.
- `NavLink` is the single source of truth for both the header nav and the footer's "Quick Links" — don't hardcode a second list.
- `Service` is shared by the Services section and the footer's "Services" column — same reasoning.
- `ContactInfoItem.type` (LOCATION/EMAIL/PHONE/WEBSITE) drives a **derived** href via `contactHref()` in `lib/content.ts` — the `mailto:`/`tel:` prefix is computed from `type`, never stored, so the display value and the link can't drift apart.
- `PortfolioCategory` is a table (not an enum) so categories are admin-manageable.

### Auth
`lib/auth.ts` (NextAuth options, Credentials provider, bcrypt) + `proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`; this repo already uses the new convention) protecting `/admin/**` and `/api/admin/**`, redirecting to `/admin/login`. Every Server Action that mutates data also calls `requireAdmin()` (`lib/requireAdmin.ts`) directly — don't rely on the proxy matcher alone for a Server Action's auth, since a future matcher change could silently stop covering it.

### Admin panel (`app/admin/`)
- `app/admin/layout.tsx` — just wraps children in the NextAuth `SessionProvider`; no visual chrome (so `/admin/login` doesn't get a sidebar).
- `app/admin/login/page.tsx` — standalone login page, outside the `(dashboard)` route group.
- `app/admin/(dashboard)/` — everything else, wrapped by `AdminSidebar` in `components/admin/AdminSidebar.tsx`.
- Mutations are **Server Actions** in `lib/actions/<entity>.ts` (create/update/delete), not API routes — each calls `revalidatePath` on every public path it affects after writing. API routes exist only where a Server Action doesn't fit: NextAuth (`app/api/auth/[...nextauth]`), the public `contact`/`newsletter` POSTs (client-side fetch with loading state), and the upload endpoint (multipart handling).
- Image/file uploads go through `app/api/admin/upload/route.ts`: validates MIME/size, re-encodes raster images through `sharp` (strips EXIF, caps dimensions), writes to `public/uploads/<purpose>/` with a random filename, logs a `Media` row. The `components/admin/ImageUploadField.tsx` client component wraps a plain URL text input with an upload button — admins can also just paste a URL directly.
- `public/icons/` (tech-stack and social-brand SVGs) is **bundled and dev-managed**, not admin-uploaded — there's no DB row for these and no upload path targets that directory. `public/uploads/` is gitignored (runtime content); `public/icons/` is committed.

### Public site
`app/page.tsx` composes `components/sections/*` (Server Components, one Prisma-backed fetch each). Interactive behavior lives in `components/interactive/*` as small Client Component leaves (theme toggle, mobile nav, scroll-spy, portfolio filter, testimonial carousel, lightbox, typewriter, the scroll-reveal `Reveal` wrapper) — the goal is that a Server Component parent can pass server-rendered children straight into a Client Component without the parent itself becoming client-side. Blog posts get real routes at `app/blog/[slug]/page.tsx`.

## Deployment

This app is meant to run as a **persistent Node.js process** (`next start`), not on serverless/edge — both SQLite and `public/uploads/` need a real, persistent filesystem.

- **Env vars** (`.env`, never committed — see `.gitignore`): `DATABASE_URL` (e.g. `file:./data/prod.db`, resolved relative to `prisma.config.ts`'s own directory, i.e. the repo root — **not** relative to `prisma/schema.prisma`, which is where Prisma <7 resolved sqlite paths), `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` (seed-time only).
- **Persistent state**: `data/` (the SQLite file) and `public/uploads/` (admin-uploaded media) are the entire persistence layer. Both are gitignored. A deploy must never re-clone over these paths — pull/build in place (`git pull && npm ci && npx prisma migrate deploy && npm run build`), then restart the process.
- **Process management**: run under PM2 (or similar) so it survives reboots/crashes; put a reverse proxy (Nginx etc.) in front for TLS termination.
- **Backups**: back up `data/*.db` and `public/uploads/` together — restoring one without the other leaves dangling image references or an empty Media log.
- First login uses `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` from `.env` at seed time — change the password via `/admin/account` immediately after.

## Legacy static site

The original static HTML/CSS/JS version (`index.html`, `styles.css`, `script.js`, `Portfolio.html`, root `assets/`) has been archived to the `legacy/static-site` branch for reference and removed from `main`. Don't resurrect these files on `main` — the Next.js app in `app/`/`components/`/`lib/`/`prisma/` is the current site.
