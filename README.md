# Perplexity Chat Tester

**Goal**: Quickly try different Perplexity models (Sonar‑Pro, Sonar, R1‑1776) with custom system prompts in a familiar chat UI.

## Setup in 3 Steps

```bash
# 1. clone & install
pnpm i --filter "./server" && pnpm i --filter "./client"

# 2. configure key
echo "PPLX_API_KEY=pplx-XXXXXXXXXXXXXXXX" > server/.env

# 3. run both dev servers (proxy & Vite)
pnpm --parallel --workspace-root dev
```

Open <http://localhost:5173> and chat away.

> **Why the proxy?** Never put your Perplexity key in browser code – it violates the
> docs and exposes paid credentials. The tiny Express server keeps the key hidden.

## Production build

```bash
pnpm --filter client build
# then serve /client/dist with nginx, Netlify, Cloudflare Pages, etc.
```

---
MIT © 2025 TecAce
