# Peaceful Rest Baptist Church — Project Guide

## Live Site
- **Production:** https://peaceful-rest.vercel.app
- **GitHub:** https://github.com/Demaster4/peaceful-rest
- **Deploy command:** `npx vercel --yes --prod` (already authenticated as demaster4)

## Tech Stack
- Next.js 14 (App Router), TypeScript
- Tailwind CSS — colors: navy `#0B1F3A`, gold `#C9A84C`, cream `#FAF7F2`
- Sanity.io — installed, NOT yet wired up
- Vercel hosting (free)
- YouTube RSS for sermon auto-sync (no API key needed)
- Channel ID: `UCnGWqkgS_j0n2bGEwldnXTA`

## Church Info
- Pastor: Rev. Chuck Survine
- Address: 1195 Lima St, Aurora, CO 80010
- Phone: (303) 364-4100
- Services: Sunday School 8:30am, Worship 10am
- YouTube: @prbcaurora
- Instagram/Facebook: @prbcaurora

## Giving Platforms
- Givelify: https://www.givelify.com/donate/MzEwNzE=/selection (primary)
- Venmo: https://venmo.com/PRBCAurora
- PayPal: https://paypal.me/peacefulrestchurch

## What's Done
- [x] Hero — AI worship photo (`public/hero-worship.png`), slow zoom + fade-in animations
- [x] Hero copy — "GOD'S PERFECT PEACE" kicker → "You're welcome here." → "Sundays at 10:00 AM • Aurora, CO"
- [x] Hero buttons — "Plan Your Visit" (gold) + "Watch a Sermon" (outlined white)
- [x] Navbar — fixed, mobile responsive, text logo "PEACEFUL REST / Baptist Church"
- [x] All h2s — `font-extrabold tracking-tight` across every section
- [x] All `<img>` → `<Image />` (Next.js optimized), remote domains configured in next.config.mjs
- [x] Sermon thumbnails — YouTube RSS auto-pull, `*.ytimg.com` whitelisted, using hqdefault (always exists)
- [x] About — Pastor Charles photo (`public/pastor-charles.jpg`)
- [x] Ministries — Unsplash stock photos, `images.unsplash.com` whitelisted
- [x] Events — placeholder dates, needs real events
- [x] Give — 3 real giving buttons wired up
- [x] Contact — modern ring-based form inputs, no email backend yet
- [x] Footer — text only
- [x] Favicon — navy square with white geometric dove (`src/app/favicon.ico` + `src/app/icon.png`)
- [x] Logo files saved — `public/logo.png` (full, cream bg), `public/logo-dove.png` (dove only, transparent)

## What's Next (priority order)
1. **Wire up Sanity CMS** — Uncle Chuck manages events/announcements himself
2. **Real events** — replace placeholder events with actual upcoming ones
3. **Contact form email** — wire up Resend (free tier)
4. **Connect domain** — point peacefulrest.org to Vercel
5. **Real hero photo** — replace AI image when a real Sunday service photo is available (one file swap: `public/hero-worship.png`)
6. **Logo** — AI-generated dove logo exists but needs improvement; try Adobe Firefly or Looka for a better version

## Design Decisions (don't revert these)
- Brand colors are intentional — do NOT change navy/gold to amber/gradient per generic AI suggestions
- Hero is centered layout, NOT left-aligned
- Section spacing is `py-24` throughout — correct, do not increase
- Cards already use `rounded-2xl`/`rounded-3xl` and soft shadows — do not "fix" these
- Sermon thumbnails use `hqdefault` from RSS — do NOT try to upgrade to `maxresdefault` (not always available)

## Key Notes
- Ministries: Men's Mafia and Women of Virtue NOT active yet
- ChurchTrac: Uncle Chuck uses this for member management — keep it, don't replace
- Cousin (niece of Pastor): built https://peacefulrestbc.com with Lovable — Pastor wants collaboration
- Target audience: young Black families 28-42, young professionals 24-35
- Use agents for fetch/deploy/research tasks to preserve context window
- Agents sometimes fail to complete deploys — if agent reports deploy running in background, read the output file or run deploy directly
