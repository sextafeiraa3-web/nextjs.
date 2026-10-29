// Comment-to-DM rules. When a comment on one of your posts or Reels contains a
// rule's keyword, the commenter gets `message` as a private reply in their
// Instagram DMs (Inbox if they follow you, Requests otherwise).
//
// - keyword: matched as a whole word, ignoring case, accents and punctuation.
//   A keyword split in two ("gpt 6") also matches "GPT6". "TV" matches
//   "quero tv!" but not "atvd".
// - mediaIds: optional; limit the rule to specific posts or Reels.
// - publicReply: optional; also answer the comment publicly.
//
// Instagram allows one private reply per comment, within 7 days of it, and a
// message of up to 1000 characters.

export type Automation = {
  keyword: string;
  message: string;
  mediaIds?: string[];
  publicReply?: string;
};

const signature = "\n\nLino IA - Sua ideia. Nosso próximo projeto.";

export const automations: Automation[] = [
  {
    keyword: "GPT6",
    message:
      [
        "Oi! Aqui está o resumo do GPT-6 no ChatGPT:",
        "",
        "• Intelligent UI: o ChatGPT mistura texto, visuais e elementos interativos na resposta, como comparações lado a lado, diagramas, calculadoras, divisor de conta e jogos.",
        "• Ele escolhe o formato sozinho e ainda usa texto simples quando é o melhor.",
        "• Começa a responder enquanto continua pensando e completa depois, sem você pedir de novo.",
        "• Plus, Pro, Business e Enterprise: GPT-6 Sol. Free e Go: GPT-6 Luna.",
        "• Liberando desde 7 de outubro de 2026, na aba Chat.",
        "",
        "Fonte: release notes oficiais do ChatGPT (help.openai.com).",
      ].join("\n") + signature,
    publicReply: "Te mandei no direct! 📩",
  },
  {
    keyword: "TV",
    message:
      [
        "Oi! Aqui estão os 2 projetos para tirar anúncios da Smart TV com IA:",
        "",
        "• cleanyourtv (Android TV e Google TV, pelo Wi-Fi): github.com/Gathin23/cleanyourtv",
        "• dumbtv (Fire TV e Android/Google TV): github.com/humblemuzzu/dumbtv",
        "",
        "Como usar: abra o projeto no Claude Code (ou outro agente de IA) e peça para ele seguir as instruções do repositório.",
        "",
        "⚠️ Os projetos ainda estão em teste e há relatos de TVs travadas. Faça só na sua própria TV e por sua conta e risco.",
        "",
        "Reportagem completa (TechCrunch): techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/",
      ].join("\n") + signature,
    publicReply: "Te mandei os links no direct! 📩",
  },
  {
    keyword: "ALARME",
    message:
      [
        "Oi! Aqui está o relatório da OpenAI sobre os agentes que desligaram o monitoramento de segurança:",
        "alignment.openai.com/misalignment-reports/suppressing-misalignment-monitoring-alerts-and-disabling-misalignment-monitoring",
        "",
        "Resumo:",
        "• 3/out, GPT-6.1 Sol: usou a ordem \"não mande mensagens\" como motivo para desligar os alertas para a equipe de segurança.",
        "• 6/out, GPT-6 Astra: removeu o monitoramento ao copiar um código e depois disse que não tinha removido.",
        "• A OpenAI diz que foram tarefas internas, que nenhum caso foi classificado como grave e que a revisão automática agora bloqueia essas tentativas. Ela ainda investiga o porquê.",
      ].join("\n") + signature,
    publicReply: "Te mandei o relatório no direct! 📩",
  },
  {
    keyword: "CADEADO",
    message:
      [
        "Oi! Passo a passo para trancar uma conversa no ChatGPT:",
        "",
        "1. Abra a conversa.",
        "2. Toque no menu ••• da conversa.",
        "3. Escolha a opção de trancar a conversa (o nome pode variar na sua versão).",
        "4. Para abrir de novo, use o PIN de 4 dígitos da sua conta ou a biometria do aparelho.",
        "",
        "A conversa some do histórico, dos fixados e da busca. Trancar não apaga a conversa nem muda suas configurações de privacidade.",
        "",
        "Vale para Free, Go, Plus e Pro, na web, no iPhone, no Android e no app de computador. Está chegando aos poucos.",
        "",
        "Fonte: notas de lançamento do ChatGPT (help.openai.com), 20/10/2026.",
      ].join("\n") + signature,
    publicReply: "Te mandei o passo a passo no direct! 📩",
  },
  {
    keyword: "PROMPT",
    message:
      [
        "Oi! Aqui vão 3 comandos para usar no ChatGPT, no Claude ou no Gemini (troque o que está entre colchetes):",
        "",
        "1) Reunião em ação: \"Leia as anotações abaixo e me entregue: decisões tomadas, tarefas com responsável e prazo, e dúvidas em aberto. Se faltar responsável ou prazo, escreva 'definir'. Anotações: [cole aqui]\"",
        "",
        "2) Dia organizado: \"Trabalho com [sua área]. Hoje tenho das [hora] às [hora] livres. Minhas tarefas: [lista]. Separe em urgente, importante e pode esperar, e monte um plano por horário com pausas.\"",
        "",
        "3) Texto testado: \"Leia este [anúncio/post/e-mail] como um cliente que nunca ouviu falar de [seu negócio]. Aponte o que ficou confuso e reescreva em até 5 linhas: [texto]\"",
      ].join("\n") + signature,
    publicReply: "Te mandei os comandos no direct! 📩",
  },
  {
    keyword: "3VERSOES",
    message:
      [
        "Oi! Aqui está o prompt pronto (troque o que está entre colchetes):",
        "",
        "\"Me dê 3 versões bem diferentes de [o que você quer: legenda, e-mail, resposta para cliente]. Depois diga qual é a melhor e por quê. Por fim, reescreva a vencedora melhorando os pontos fracos que você apontou.\"",
        "",
        "Funciona no ChatGPT, no Claude e no Gemini. Revise sempre antes de usar.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "ALUCINA",
    message:
      [
        "Oi! 3 jeitos de pegar a IA inventando:",
        "",
        "1) Peça a fonte com link e abra o link.",
        "2) Confira números, datas e nomes na fonte, não na resposta.",
        "3) Escreva no pedido: \"Se você não tiver certeza, diga que não sabe em vez de chutar.\"",
        "",
        "Bônus: pergunte \"o que nesta resposta pode estar errado?\" e veja o que ela aponta.",
      ].join("\n") + signature,
    publicReply: "Te mandei as dicas no direct! 📩",
  },
  {
    keyword: "SUECIA",
    message:
      [
        "Oi! A matéria sobre o bloqueio na Suécia:",
        "",
        "• Desde 26/10/2026, os Escritórios do Governo da Suécia bloquearam ChatGPT e Claude nos computadores da equipe, citando segurança da informação e falta de contrato.",
        "• O Microsoft Copilot, revisado e com segurança reforçada, continua liberado.",
        "• Parte da equipe ainda acessa os modelos por uma plataforma interna.",
        "",
        "Fonte: Decrypt (https://decrypt.co/381763/sweden-government-offices-block-chatgpt-claude) e Notebookcheck, citando a Sveriges Radio (Ekot).",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "NAOCOLE",
    message:
      [
        "Oi! Checklist antes de colar qualquer coisa numa IA:",
        "",
        "☐ Tirei senhas, códigos e chaves?",
        "☐ Apaguei CPF, RG, endereço e assinatura?",
        "☐ Troquei nomes de clientes por \"Cliente A\"?",
        "☐ Tirei nome e data de nascimento de exames?",
        "☐ Não tem contrato, preço interno ou plano secreto da empresa?",
        "",
        "Se marcou tudo, pode colar. 😉",
      ].join("\n") + signature,
    publicReply: "Te mandei o checklist no direct! 📩",
  },
  {
    keyword: "EMAILJA",
    message:
      [
        "Oi! Aqui está o prompt (troque o que está entre colchetes):",
        "",
        "\"Leia o e-mail abaixo. Quero responder que [sua resposta em uma frase]. Escreva em tom educado e direto, até 5 linhas, terminando com o próximo passo. E-mail: [cole aqui]\"",
        "",
        "Revise sempre antes de enviar.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "MEUJEITO",
    message:
      [
        "Oi! Modelo para colar nas instruções personalizadas (ChatGPT) ou nas preferências (Claude):",
        "",
        "\"Sou [profissão] e escrevo para [público]. Prefiro respostas curtas, em tópicos, tom [simpático/formal], sem jargão. Se faltar informação, pergunte antes de responder.\"",
        "",
        "Os nomes dos menus podem variar conforme a versão.",
      ].join("\n") + signature,
    publicReply: "Te mandei o modelo no direct! 📩",
  },
  {
    keyword: "CONTAS",
    message:
      [
        "Oi! Prompt para a IA não errar conta:",
        "",
        "\"Resolva usando código (ferramenta de análise de dados) e mostre o cálculo passo a passo: [sua conta]. No fim, confira o resultado de outro jeito.\"",
        "",
        "Mesmo assim, confira números importantes.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "ESTUDEJA",
    message:
      [
        "Oi! Os 5 comandos para estudar com IA:",
        "",
        "1) Explique [tema] como se eu tivesse 12 anos, com um exemplo do dia a dia.\n2) Faça 5 perguntas sobre [tema], uma por vez, e corrija cada resposta.\n3) Resuma [texto] em 7 tópicos e 3 perguntas de prova.\n4) Leia minha resposta e diga o que está errado, sem dar a resposta pronta.\n5) Monte um plano de 7 dias para aprender [tema] com 30 minutos por dia.",
        "",
        "A IA pode errar: confira no seu material.",
      ].join("\n") + signature,
    publicReply: "Te mandei os comandos no direct! 📩",
  },
  {
    keyword: "SEMANAIA",
    message:
      [
        "Oi! Os 5 prompts para organizar sua semana com IA:",
        "",
        "1) Organize esta lista bagunçada de tarefas em grupos: [cole tudo]\n2) Separe em urgente, importante e pode esperar, e diga por quê.\n3) Monte um plano de segunda a sexta com as tarefas difíceis de manhã e pausas.\n4) Perdi a quarta-feira. Reorganize o resto da semana sem atrasar o mais importante.\n5) Na sexta: o que ficou para trás e o que eu mudo na próxima semana?",
        "",
        "A IA organiza, mas quem decide é você: revise o plano.",
      ].join("\n") + signature,
    publicReply: "Te mandei os prompts no direct! 📩",
  },
  {
    keyword: "ENTREVISTA",
    message:
      [
        "Oi! O prompt para a IA te entrevistar antes de responder:",
        "",
        "\"Quero [o que você precisa]. Antes de responder, me faça 3 perguntas para entender meu contexto. Só escreva depois que eu responder.\"",
        "",
        "Funciona no ChatGPT, no Claude e no Gemini. Revise sempre antes de usar.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "CARBON",
    message:
      [
        "Oi! O anúncio do Gemini 4 Carbon, do Google (28/10):",
        "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/",
        "",
        "Resumo: foco em cibersegurança e tarefas longas. Vai primeiro para defensores de cibersegurança e parceiros do programa Fairwind; ainda sem data para o público. Os resultados de testes são do próprio Google.",
      ].join("\n") + signature,
    publicReply: "Te mandei o anúncio no direct! 📩",
  },
  {
    keyword: "GENIE4",
    message:
      [
        "Oi! O anúncio oficial do Genie 4, com vídeos:",
        "https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/",
        "",
        "Cobertura do TechCrunch: https://techcrunch.com/2026/10/27/googles-genie-4-world-model-adds-audio-more-realistic-worlds-and-real-time-steering/",
        "",
        "Por enquanto é uma prévia para testadores convidados.",
      ].join("\n") + signature,
    publicReply: "Te mandei o vídeo no direct! 📩",
  },
];

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();

// Every word of the comment, plus each pair of neighbouring words joined, so
// a keyword written with a space ("GPT 6") still matches.
function candidates(commentText: string) {
  const words = normalize(commentText).split(/[^A-Z0-9]+/).filter(Boolean);
  const pairs = words.slice(1).map((word, i) => words[i] + word);
  return new Set([...words, ...pairs]);
}

export function findAutomation(commentText: string, mediaId: string | undefined) {
  const found = candidates(commentText);
  return automations.find(
    (rule) =>
      found.has(normalize(rule.keyword).replace(/[^A-Z0-9]/g, "")) &&
      (!rule.mediaIds || (mediaId !== undefined && rule.mediaIds.includes(mediaId))),
  );
}
