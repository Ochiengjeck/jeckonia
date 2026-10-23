# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Jeckonia Opiyo Ochieng's personal portfolio, rebuilt as a Next.js (App Router) application with a custom admin CMS. Content (profile, skills, services, portfolio items, testimonials, blog posts, contact info, site settings) lives in MySQL via Prisma and is edited through `/admin`, not hardcoded in markup. The original static HTML/CSS/JS version has been removed from `main`; the Next.js app in `app/`/`components/`/`lib`/`prisma/` is the only version of the site.

## Commands

```
npm run dev            # start dev server (Turbopack) at localhost:3000
npm run build           # production build
npm run start            # run a production build
npm run lint              # eslint

npx prisma studio          # browse/edit the DB directly
npx prisma migrate dev --name <name>   # create + apply a migration after editing schema.prisma
npx prisma generate           # regenerate the client (into app/generated/prisma) after a schema change
npx prisma db seed           # re-run prisma/seed.ts against the current DB
```

There is no test suite configured. Verify changes by running `npm run build` (catches type errors across Server/Client Components) and by exercising the affected page(s) via the dev server.

## Architecture

### Stack
Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + Prisma 7 (MySQL via the `@prisma/adapter-mariadb` driver adapter — Prisma 7 requires an explicit driver adapter, there's no more bundled query engine; the `mariadb` npm driver speaks the MySQL wire protocol so it works against both MySQL and MariaDB servers) + NextAuth.js (Credentials provider, JWT sessions) + Tiptap (blog rich text) + react-icons (`fa6` set).

### Data model (`prisma/schema.prisma`)
One row per content entity, fetched via typed helpers in `lib/content.ts` (each wrapped in React's `cache()` so Header/Footer/etc. sharing the same query within one request only hit the DB once). Notable design choices, not obvious from the schema alone:
- `Profile` and `SiteSettings` are **singletons** — always queried/written with `id: "singleton"`.
- `Skill` is one unified model (`category` TECHNICAL/PROFESSIONAL, nullable `percent`/`iconUrl`) rather than three separate lists, so a skill can be a progress bar, an icon badge, or both from one row.
- `NavLink` is the single source of truth for both the header nav and the footer's "Quick Links" — don't hardcode a second list.
- `Service` is shared by the Services section and the footer's "Services" column — same reasoning.
- `ContactInfoItem.type` (LOCATION/EMAIL/PHONE/WEBSITE) drives a **derived** href via `contactHref()` in `lib/content.ts` — the `mailto:`/`tel:` prefix is computed from `type`, never stored, so the display value and the link can't drift apart.
- `PortfolioCategory` is a table (not an enum) so categories are admin-manageable.
- Long free-text fields (`aboutBioHtml`, `contentHtml`, `message`, etc.) are marked `@db.Text` — MySQL's default `String` mapping is `VARCHAR(191)`, which would silently truncate blog posts/bios/messages without it. MySQL also can't have a `@default(...)` on a `@db.Text` column (`BLOB/TEXT/GEOMETRY/JSON column can't have a default value`), so those fields are required with no DB-level default instead — application code (`prisma/seed.ts`, the Server Actions in `lib/actions/`) always supplies an explicit value (even `""`) on create, so this is safe in practice.

### Auth
`lib/auth.ts` (NextAuth options, Credentials provider, bcrypt) + `proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`; this repo already uses the new convention) protecting `/admin/**` and `/api/admin/**`, redirecting to `/admin/login`. Every Server Action that mutates data also calls `requireAdmin()` (`lib/requireAdmin.ts`) directly — don't rely on the proxy matcher alone for a Server Action's auth, since a future matcher change could silently stop covering it.

### Admin panel (`app/admin/`)
- `app/admin/layout.tsx` — just wraps children in the NextAuth `SessionProvider`; no visual chrome (so `/admin/login` doesn't get a sidebar).
- `app/admin/login/page.tsx` — standalone login page, outside the `(dashboard)` route group.
- `app/admin/(dashboard)/` — everything else, wrapped by `AdminSidebar` in `components/admin/AdminSidebar.tsx`.
- Mutations are **Server Actions** in `lib/actions/<entity>.ts` (create/update/delete), not API routes — each calls `revalidatePath` on every public path it affects after writing. API routes exist only where a Server Action doesn't fit: NextAuth (`app/api/auth/[...nextauth]`), the public `contact`/`newsletter` POSTs (client-side fetch with loading state), and the upload endpoint (multipart handling).
- Image/file uploads go through `app/api/admin/upload/route.ts`: validates MIME/size, then streams the buffer to Cloudinary via `lib/cloudinary.ts` (`uploadToCloudinary`, folder per `purpose` under `jeckonia/`, images capped to 2000x2000 via a Cloudinary transformation — no local image processing). Logs a `Media` row with `path` set to the returned `secure_url` and `publicId` set to the Cloudinary `public_id` (needed to later delete/manage the asset). The `components/admin/ImageUploadField.tsx` client component wraps a plain URL text input with an upload button — admins can also just paste a URL directly.
- `public/icons/` (tech-stack and social-brand SVGs) is **bundled and dev-managed**, not admin-uploaded — there's no DB row for these and no upload path targets that directory; it's committed. Admin-uploaded media lives entirely in Cloudinary, not on local/server disk — `public/uploads/` is still gitignored but unused leftover from before the Cloudinary migration.

### Public site
`app/page.tsx` composes `components/sections/*` (Server Components, one Prisma-backed fetch each). Interactive behavior lives in `components/interactive/*` as small Client Component leaves (theme toggle, mobile nav, scroll-spy, portfolio filter, testimonial carousel, lightbox, typewriter, the scroll-reveal `Reveal` wrapper) — the goal is that a Server Component parent can pass server-rendered children straight into a Client Component without the parent itself becoming client-side. Blog posts get real routes at `app/blog/[slug]/page.tsx`.

## Deployment (Spaceship hosting)

This app targets **Spaceship's cPanel "Setup Node.js App" tool** (Advanced → Development Tools → Node.js App), which runs Node apps under **Phusion Passenger** via CloudLinux. Passenger is both the process supervisor (auto-restart on crash, starts on boot) and the reverse proxy/TLS terminator through the existing Apache/LiteSpeed + AutoSSL setup — there's no separate PM2 or Nginx config to manage.

### Why a custom `server.js`
Passenger expects the startup file to listen on the port it assigns via `process.env.PORT`; the plain Next.js CLI (`next start`) doesn't reliably pick that up when spawned the way Passenger spawns it. `server.js` at the repo root wraps Next's custom-server API (`next()` + `app.prepare()` + a plain `http.createServer`) to listen on `process.env.PORT` explicitly. It requires `next build` to have already run — it serves the production build, not source. `npm run start:passenger` runs it locally if you want to sanity-check the exact entry point Passenger will use.

### One-time setup in cPanel
1. **Setup Node.js App** → Create Application:
   - Node.js version: 20.19+ (see `engines.node` in `package.json`; Prisma 7 requires it)
   - Application mode: **Production**
   - Application root: the path this repo is checked out to (e.g. `~/jeckonia`)
   - Application URL: your domain/subdomain
   - Application startup file: `server.js`
2. Create a MySQL database + user in cPanel (**MySQL Databases**), and note the database name, username, password, and host (usually `localhost` when the app and DB are on the same account).
3. Add environment variables in the Node.js App UI (not committed anywhere — see `.gitignore`'s `.env*` rule): `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"` using the credentials from step 2, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (your real domain), `NODE_ENV=production`, and `CLOUDINARY_CLOUD_NAME`/`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET` (admin media uploads go straight to Cloudinary — see `lib/cloudinary.ts` — there's no local upload directory to provision on the server). `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` are only needed for the one-time seed run below, not at runtime afterward.
4. SSH in (or use the cPanel UI's "Run NPM Install" button, which activates the app's `nodevenv` for you) and run, from the application root:
   ```
   npm ci                        # NOT --omit=dev / --only=production —
                                  # the Prisma CLI is a devDependency and
                                  # the postinstall script needs it to run
                                  # `prisma generate`
   npx prisma migrate deploy      # applies committed migrations
   npx prisma db seed             # first deploy only — seeds real content + admin user
   npm run build
   ```
   The cPanel DB user generally needs no more than the standard `ALL PRIVILEGES` on its own database (`migrate deploy` applies committed SQL directly — it doesn't need a shadow database the way `migrate dev` does, so no extra `CREATE DATABASE`-level grant is required in production).
5. Click **Restart** in the Node.js App manager (or `touch tmp/restart.txt` in the app root) to have Passenger pick up the build.
6. Log in at `/admin` with `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` and immediately change the password via `/admin/account`.

### Every subsequent deploy
`git pull` (never re-clone over the app root — see below) → `npm ci` → `npx prisma migrate deploy` (only does something if `prisma/migrations/` has new folders) → `npm run build` → Restart in cPanel. `./deploy.sh [app-root]` runs exactly this sequence and stops on the first failure — run it from the app root over SSH.

### Persistent state
Admin-uploaded media lives in Cloudinary, not on the app's local disk, so a deploy that re-clones/overwrites the app root can't lose it — only the `Media` table rows (which store the Cloudinary `secure_url`/`public_id`) are app-root state, and those live in MySQL. Back up the database via cPanel's own MySQL backup/export tools (e.g. `mysqldump`) on whatever schedule the host provides; back up Cloudinary assets via Cloudinary's own backup/export tooling if you need that independently of the DB, since restoring the DB without the Cloudinary assets (or vice versa) leaves dangling image references or orphaned uploads.

### Local development database
Local dev talks to a local MySQL/MariaDB server via the same `@prisma/adapter-mariadb` adapter — there's no SQLite fallback. Point `DATABASE_URL` in `.env` at a local database (see the comment in `.env` — it defaults to a `jeckonia_dev` database/user pair), or at a remote one if you don't run MySQL locally. `npx prisma migrate dev` needs a DB user with rights to create a temporary shadow database (it diffs against a throwaway DB to compute migration SQL); a plain `GRANT ALL ON jeckonia_dev.*` isn't enough for that — either grant the local dev user broader rights or use `root` locally. Production's `migrate deploy` doesn't have this requirement.
