// GET /faq/refund — answers the refund FAQ through Cloudflare AI Gateway (REST),
// using a fixed cache key so repeated calls are served from the gateway cache.
// Docs: https://developers.cloudflare.com/ai-gateway/features/caching/

export const CACHE_KEY = "faq:refund:v1";
export const CACHE_TTL = 3600; // seconds
export const MODEL = "@cf/meta/llama-3.1-8b-instruct";

const PROMPT = [
  { role: "system", content: "You are a concise customer-support assistant." },
  {
    role: "user",
    content:
      "Explain our refund policy in 3 short bullet points: how to request a refund, the time window, and how long the refund takes.",
  },
];

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extra },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/faq/refund") return json({ error: "not_found" }, 404);
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { allow: "GET" });

    for (const name of ["CLOUDFLARE_ACCOUNT_ID", "AI_GATEWAY_ID", "CLOUDFLARE_API_TOKEN"]) {
      if (!env[name]) return json({ error: `missing_${name}` }, 500);
    }

    const gatewayUrl =
      `https://gateway.ai.cloudflare.com/v1/${env.CLOUDFLARE_ACCOUNT_ID}` +
      `/${env.AI_GATEWAY_ID}/workers-ai/${MODEL}`;

    const headers = {
      "content-type": "application/json",
      authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
      "cf-aig-cache-key": CACHE_KEY,
      "cf-aig-cache-ttl": String(CACHE_TTL),
    };
    // Only needed when the gateway has "Authenticated Gateway" turned on.
    if (env.CF_AIG_TOKEN) headers["cf-aig-authorization"] = `Bearer ${env.CF_AIG_TOKEN}`;

    const upstream = await fetch(gatewayUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ messages: PROMPT, max_tokens: 256 }),
    });

    const cacheStatus = upstream.headers.get("cf-aig-cache-status") ?? "UNKNOWN";
    const data = await upstream.json().catch(() => null);

    if (!upstream.ok || !data?.success) {
      return json(
        { error: "gateway_error", status: upstream.status, details: data?.errors ?? data },
        502,
        { "cf-aig-cache-status": cacheStatus },
      );
    }

    return json(
      { answer: data.result?.response, cacheKey: CACHE_KEY, ttl: CACHE_TTL, cacheStatus },
      200,
      { "cf-aig-cache-status": cacheStatus, "cache-control": "no-store" },
    );
  },
};
