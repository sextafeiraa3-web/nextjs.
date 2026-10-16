# Worker `GET /faq/refund` via AI Gateway (REST) com cache

Responde ao FAQ de reembolso chamando Workers AI pelo **AI Gateway REST**, com
cache por chave fixa. Fonte: <https://developers.cloudflare.com/ai-gateway/features/caching/>

| Header enviado ao gateway | Valor |
|---|---|
| `cf-aig-cache-key` | `faq:refund:v1` |
| `cf-aig-cache-ttl` | `3600` |

A resposta do Worker repassa `cf-aig-cache-status` (`MISS` na 1ª chamada, `HIT` nas seguintes até expirar).
Um `HIT` é servido pelo cache do gateway, sem executar o modelo — custo zero de inferência.

## Requisitos
- Node.js 18+
- Conta Cloudflare com um AI Gateway criado e créditos de Workers AI
- API token com permissão **Workers AI: Read**

## Setup
```bash
cd workers/faq-refund
npm i -D wrangler && npx wrangler login
# edite wrangler.jsonc: CLOUDFLARE_ACCOUNT_ID e AI_GATEWAY_ID
npx wrangler secret put CLOUDFLARE_API_TOKEN
# opcional, se o gateway for "Authenticated": npx wrangler secret put CF_AIG_TOKEN
```
Para `wrangler dev`, coloque os segredos em `.dev.vars` (já no `.gitignore`).

## Teste
```bash
npm test                              # offline, gateway simulado (MISS -> HIT)
npx wrangler deploy
npm run smoke -- https://faq-refund.<sub>.workers.dev   # real: espera MISS e depois HIT
```
Confirme o custo zero do 2º request em **AI Gateway > Logs** (status `Cached`).

Para invalidar o cache, troque a chave para `faq:refund:v2`.
