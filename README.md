# Perplexity Chat Tester

**Goal**: Quickly try different Perplexity models (Sonar‑Pro, Sonar, R1‑1776) with custom system prompts in a familiar chat UI.

## Setup in 3 Steps

```bash
# 1. clone & install
npm install

# 2. configure key
echo "PPLX_API_KEY=pplx-XXXXXXXXXXXXXXXX" > server/.env

# 3. run both dev servers (proxy & Vite)
npm run dev
```

Open <http://localhost:5173> and chat away.

> **Why the proxy?** Never put your Perplexity key in browser code – it violates the
> docs and exposes paid credentials. The tiny Express server keeps the key hidden.

## Production build

```bash
npm run build --workspace=client
# then serve /client/dist with nginx, Netlify, Cloudflare Pages, etc.
```

## Deploy to Render

### For the full-stack app (recommended):

1. **Build Command:** `npm install && npm run build --workspace=client`
2. **Start Command:** `npm run start --workspace=server`
3. **Environment Variables:** Add `PPLX_API_KEY=your_actual_key_here`
4. **Root Directory:** Leave as root (.)

### For static frontend only (if using external API):

1. **Build Command:** `npm install && npm run build --workspace=client`
2. **Publish Directory:** `client/dist`
3. Choose "Static Site" service type

---
MIT © 2025 TecAce
