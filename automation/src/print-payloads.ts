// CLI: node --experimental-strip-types src/print-payloads.ts <plan.json> <out/date/manifest.json> <urls.json>
// Prints the createScheduledPost arguments (blogId 7384024) the Factory sends.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { BLOG_ID, buildPayloads } from "./payloads.ts";

const [planFile, manifestFile, urlsFile] = process.argv.slice(2);
if (!planFile || !manifestFile || !urlsFile) {
  console.error("usage: print-payloads <plan.json> <manifest.json> <publish-media output .json>");
  process.exit(2);
}
const read = (f: string) => JSON.parse(readFileSync(resolve(process.env.INIT_CWD ?? process.cwd(), f), "utf8"));
const published = read(urlsFile);
const payloads = buildPayloads(read(planFile), published.urls ?? published, read(manifestFile));
console.log(JSON.stringify(payloads.map((p) => ({ ...p, blogId: BLOG_ID, info: JSON.stringify(p.info) })), null, 2));
