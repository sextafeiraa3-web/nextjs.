// Calls to the Instagram API with Instagram Login (graph.instagram.com).
// Needs a long-lived Instagram User access token with the
// instagram_business_basic and instagram_business_manage_comments permissions.

const version = process.env.INSTAGRAM_GRAPH_VERSION;
const base = `https://graph.instagram.com${version ? `/${version}` : ""}`;

async function post(path: string, body: unknown) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) throw new Error("INSTAGRAM_ACCESS_TOKEN is not set");

  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Instagram API ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Private reply: a DM to the person who wrote the comment.
export function sendPrivateReply(igUserId: string, commentId: string, text: string) {
  return post(`/${igUserId}/messages`, {
    recipient: { comment_id: commentId },
    message: { text },
  });
}

// Public reply under the comment.
export function replyToComment(commentId: string, text: string) {
  return post(`/${commentId}/replies`, { message: text });
}
