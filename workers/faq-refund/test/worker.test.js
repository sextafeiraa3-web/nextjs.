// Offline test: mocks the AI Gateway to check headers sent and the
// cf-aig-cache-status passthrough (MISS on first call, HIT on second).
import { test } from "node:test";
import assert from "node:assert/strict";
import worker, { CACHE_KEY, CACHE_TTL } from "../src/index.js";

const env = {
  CLOUDFLARE_ACCOUNT_ID: "acc123",
  AI_GATEWAY_ID: "gw",
  CLOUDFLARE_API_TOKEN: "tok",
};

test("GET /faq/refund returns MISS then HIT with fixed cache key", async () => {
  const cache = new Map();
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    const key = init.headers["cf-aig-cache-key"];
    const hit = cache.has(key);
    if (!hit) cache.set(key, { success: true, result: { response: "- Refund in 30 days" } });
    return new Response(JSON.stringify(cache.get(key)), {
      headers: { "cf-aig-cache-status": hit ? "HIT" : "MISS" },
    });
  };

  const req = () => new Request("https://w.example/faq/refund");
  const r1 = await worker.fetch(req(), env);
  const r2 = await worker.fetch(req(), env);

  assert.equal(r1.status, 200);
  assert.equal(r1.headers.get("cf-aig-cache-status"), "MISS");
  assert.equal(r2.headers.get("cf-aig-cache-status"), "HIT");
  assert.deepEqual(await r1.json(), await r2.json().then((b) => ({ ...b, cacheStatus: "MISS" })));

  const { url, init } = calls[0];
  assert.equal(url, "https://gateway.ai.cloudflare.com/v1/acc123/gw/workers-ai/@cf/meta/llama-3.1-8b-instruct");
  assert.equal(init.headers["cf-aig-cache-key"], CACHE_KEY);
  assert.equal(init.headers["cf-aig-cache-ttl"], String(CACHE_TTL));
  assert.equal(init.headers.authorization, "Bearer tok");
});

test("rejects other routes and methods", async () => {
  assert.equal((await worker.fetch(new Request("https://w.example/x"), env)).status, 404);
  const post = new Request("https://w.example/faq/refund", { method: "POST" });
  assert.equal((await worker.fetch(post, env)).status, 405);
});
