// Comment-to-DM rules. When a comment on one of your posts or Reels contains a
// rule's keyword, the commenter gets `message` as a private reply in their
// Instagram DMs (Inbox if they follow you, Requests otherwise).
//
// - keyword: matched case-insensitively, ignoring accents, spaces and
//   punctuation, so "gpt 6", "Gpt6!" and "quero GPT6" all match "GPT6".
// - mediaIds: optional; limit the rule to specific posts or Reels.
// - publicReply: optional; also answer the comment publicly.
//
// Instagram allows one private reply per comment, within 7 days of it.

export type Automation = {
  keyword: string;
  message: string;
  mediaIds?: string[];
  publicReply?: string;
};

export const automations: Automation[] = [
  {
    keyword: "GPT6",
    message: [
      "Oi! Aqui está o resumo do GPT-6 no ChatGPT:",
      "",
      "• Intelligent UI: o ChatGPT mistura texto, visuais e elementos interativos na resposta, como comparações lado a lado, diagramas, calculadoras, divisor de conta e jogos.",
      "• Ele escolhe o formato sozinho e ainda usa texto simples quando é o melhor.",
      "• Começa a responder enquanto continua pensando e completa depois, sem você pedir de novo.",
      "• Plus, Pro, Business e Enterprise: GPT-6 Sol. Free e Go: GPT-6 Luna.",
      "• Liberando desde 7 de outubro de 2026, na aba Chat.",
      "",
      "Fonte: release notes oficiais do ChatGPT (help.openai.com).",
    ].join("\n"),
    publicReply: "Te mandei no direct! 📩",
  },
];

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

export function findAutomation(commentText: string, mediaId: string | undefined) {
  const text = normalize(commentText);
  return automations.find(
    (rule) =>
      text.includes(normalize(rule.keyword)) &&
      (!rule.mediaIds || (mediaId !== undefined && rule.mediaIds.includes(mediaId))),
  );
}
