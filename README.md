# BagsFeeHub

> Real-time creator earnings dashboard for Bags.fm token deployers — track your 1% trading fees, generate one-click claim transactions, and share reports on X.

**Built for the [Bags $4M Hackathon](https://bags.fm/hackathon) · Category: Bags API + Fee Sharing**

---

## Features

- Paste any token mint → see lifetime fees, volume, active traders instantly
- Live fee growth chart (7-day breakdown via Chart.js)
- One-click claim tx generator (Bags claim-txs endpoint — deep API integration)
- Share on X with pre-filled tweet
- Copy-to-clipboard for mint addresses and reports
- Confetti celebration on successful data load
- Verified on Bags badge
- Mobile-first responsive, dark theme, green accents (#10b981)

---

## Run Locally

```bash
git clone https://github.com/0xshobha/bagsfeehub.git
cd bagsfeehub
npm install
cp .env.example .env.local
# Edit .env.local and add NEXT_PUBLIC_BAGS_API_KEY
npm run dev
```

Open http://localhost:3000

---

## Getting a Bags API Key

1. Go to https://dev.bags.fm
2. Sign in with X (Twitter)
3. API Keys → Create new key
4. Add to `.env.local`: `NEXT_PUBLIC_BAGS_API_KEY=your_key_here`

> App works without a key using demo/fallback data — great for testing!

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Add `NEXT_PUBLIC_BAGS_API_KEY` in the Vercel dashboard environment variables.

---

## Project Structure

```
bagsfeehub/
├── app/
│   ├── layout.tsx          # Root layout + metadata + dark theme
│   ├── page.tsx            # Main page: hero + search + dashboard
│   └── globals.css         # Dark theme, green accents, animations
├── components/
│   ├── FeeDashboard.tsx    # Stats grid + Chart.js line chart + creators
│   ├── ClaimButton.tsx     # Claim tx generator with wallet input
│   ├── ShareReport.tsx     # X/Twitter share + copy report
│   └── Footer.tsx          # Footer with links
├── lib/
│   └── bagsApi.ts          # All Bags API calls + fake data fallback
└── public/
    └── logo.svg            # App logo
```

---

## Bags API Endpoints Used

| Endpoint                               | Purpose                        |
| -------------------------------------- | ------------------------------ |
| GET /api/v1/get-token-lifetime-fees    | Lifetime creator fees in SOL   |
| GET /api/v1/get-token-claim-stats      | Volume, active traders, claims |
| GET /api/v1/get-token-launch-creators  | Creator/team info              |
| POST /api/v1/token-launch/claim-txs/v2 | Generate claim transaction     |

---

## Tech Stack

Next.js 14 App Router · TypeScript · Tailwind CSS · Chart.js · Axios · lucide-react · canvas-confetti · @solana/web3.js

---

## Built by

@0xshobha · https://x.com/0xshobha

Questions? Reach out on Discord: discord.gg/bags
