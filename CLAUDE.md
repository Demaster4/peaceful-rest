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
- [x] Hero — AI-generated worship scene (`public/hero.jpg`)
- [x] Navbar — fixed, mobile responsive
- [x] Sermons — auto-pull from YouTube RSS, no manual entry needed
- [x] About — Pastor Charles photo (`public/pastor-charles.jpg`)
- [x] Ministries — stock photos, placeholder content
- [x] Events — placeholder, needs real events
- [x] Give — 3 real giving buttons wired up
- [x] Contact — form UI only, not sending emails yet
- [x] Footer

## What's Next (priority order)
1. **Wire up Sanity CMS** — Uncle Chuck manages events/announcements himself
2. **Real events** — replace placeholders with actual upcoming events
3. **Contact form email** — wire up Resend (free tier)
4. **Connect domain** — point peacefulrest.org to Vercel
5. **Sermon clips agent** — future: auto-clip sermons for social media

## Key Notes
- Ministries: Men's Mafia and Women of Virtue NOT active yet
- ChurchTrac: Uncle Chuck uses this for member management — keep it, don't replace
- Cousin (niece of Pastor): built https://peacefulrestbc.com with Lovable — Pastor wants collaboration
- Target audience: young Black families 28-42, young professionals 24-35
- Use agents for fetch/deploy/research tasks to preserve context window
