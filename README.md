# bookdt-landing

Standalone **public** landing page for `bookdt.app`. Marketing only — no auth, no data, no
backend. This exists so Google OAuth verification has a publicly reachable homepage without
exposing the Base44 app, which stays behind login on `app.bookdt.app`.

It's a faithful port of the in-app `LandingPage.jsx` (same design, fonts, and `VennIcon`).
The only wiring differences from the in-app version:

- Privacy links point to `https://privacy.bookdt.app` (absolute — must match the OAuth
  consent screen's privacy policy URL exactly).
- The "Get started" / "Start for free" CTAs point to `https://app.bookdt.app/login`.

## Local dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static site to ./dist
npm run preview  # serve the built ./dist locally
```

## Deploy (GitHub Pages)

1. Create a repo (e.g. `bookdt-landing`) and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.
4. In **Settings → Pages → Custom domain**, enter `bookdt.app`. (`public/CNAME` already carries
   this through the build, so it survives each deploy.)
5. At your DNS (IONOS), point the apex `bookdt.app` at GitHub Pages:
   - Four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `AAAA` records for IPv6, and a `www` `CNAME` → `<user>.github.io`
6. Leave "Enforce HTTPS" checked once the cert provisions.

> Note: `bookdt.app` currently points at the Base44 app. Repointing DNS here means the app must
> already be reachable at `app.bookdt.app` before you cut over, or the CTAs will 404.

## OAuth consent screen — already correct, don't touch

Homepage `https://bookdt.app` and privacy `https://privacy.bookdt.app` are already set on the
consent screen. Changing either forces a fresh verification cycle, so leave them as-is.

## OAuth client — add these (for sign-in from app.bookdt.app)

- Authorized JavaScript origin: `https://app.bookdt.app`
- Authorized redirect URI: `https://app.bookdt.app/api/external-auth/callback`
- Authorized redirect URI: `https://app.bookdt.app/google-auth-callback`

`app.bookdt.app` is a subdomain of the already-authorized `bookdt.app`, so no new authorized
domain and no re-verification is needed for these.
