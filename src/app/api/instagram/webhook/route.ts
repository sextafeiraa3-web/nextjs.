import { createHmac, timingSafeEqual } from "node:crypto";
import { after, type NextRequest } from "next/server";
import { findAutomation } from "@/instagram/automations";
import { replyToComment, sendPrivateReply } from "@/instagram/graph";

type CommentChange = {
  field: string;
  value: {
    id: string;
    text?: string;
    from?: { id: string; username?: string };
    media?: { id: string };
  };
};

type WebhookBody = {
  object: string;
  entry?: { id: string; changes?: CommentChange[] }[];
};

// Meta calls this once, when you save the webhook URL in the app dashboard.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if (
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN
  ) {
    return new Response(params.get("hub.challenge") ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

// Meta calls this for every new comment on your posts and Reels.
export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (!hasValidSignature(raw, request.headers.get("x-hub-signature-256"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  const body = JSON.parse(raw) as WebhookBody;
  if (body.object !== "instagram") return new Response("Ignored", { status: 200 });

  // Answer Meta right away; send the DMs after the response.
  after(() => handleComments(body));
  return new Response("OK", { status: 200 });
}

async function handleComments(body: WebhookBody) {
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const comment = change.value;
      // Skip other fields and your own comments (such as the public reply).
      if (change.field !== "comments" || !comment.text || comment.from?.id === entry.id) continue;

      const rule = findAutomation(comment.text, comment.media?.id);
      if (!rule) continue;

      try {
        await sendPrivateReply(entry.id, comment.id, rule.message);
        if (rule.publicReply) await replyToComment(comment.id, rule.publicReply);
        console.log(`Instagram: sent "${rule.keyword}" DM to @${comment.from?.username ?? comment.from?.id}`);
      } catch (error) {
        // A retried webhook hits Instagram's one-reply-per-comment limit and lands here.
        console.error(`Instagram: could not answer comment ${comment.id}`, error);
      }
    }
  }
}

function hasValidSignature(raw: string, header: string | null) {
  const secret = process.env.INSTAGRAM_APP_SECRET;
  if (!secret || !header?.startsWith("sha256=")) return false;

  const expected = Buffer.from(createHmac("sha256", secret).update(raw).digest("hex"));
  const received = Buffer.from(header.slice("sha256=".length));
  return expected.length === received.length && timingSafeEqual(expected, received);
}
