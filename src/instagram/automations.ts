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
  {
    keyword: "POSTPRONTO",
    message:
      [
        "Oi! Os 5 prompts para criar posts do seu negócio:",
        "",
        "1) Me dê 10 ideias de post para [seu negócio] que respondam dúvidas reais de clientes.\n2) Escreva 5 primeiras frases que façam alguém parar de rolar o feed sobre [tema].\n3) Escreva uma legenda curta, no meu tom [descreva], terminando com uma pergunta.\n4) Monte um calendário de 7 dias de posts para [seu negócio], um por dia.\n5) Leia este post e diga o que está confuso ou longo demais: [cole].",
        "",
        "A IA dá o rascunho; a sua voz e a revisão final são suas.",
      ].join("\n") + signature,
    publicReply: "Te mandei os prompts no direct! 📩",
  },
  {
    keyword: "RESUMOPDF",
    message:
      [
        "Oi! O prompt para resumir um PDF:",
        "",
        "\"Resuma este PDF em 5 tópicos curtos. Em cada tópico, diga a página de onde tirou a informação. No fim, liste o que eu preciso fazer agora.\"",
        "",
        "Confira as páginas citadas. Documento sigiloso? Não anexe.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "CONTEXTO",
    message:
      [
        "Oi! O prompt para continuar uma conversa longa sem perder nada:",
        "",
        "\"Resuma nossa conversa em até 10 tópicos com tudo que importa: objetivo, decisões e detalhes. Vou colar esse resumo numa conversa nova.\"",
        "",
        "Depois, abra uma conversa nova e cole o resumo no começo.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "OFFLINE",
    message:
      [
        "Oi! A matéria sobre a OpenAI treinar os modelos mais avançados sem internet ao vivo (23/10):",
        "https://techcrunch.com/2026/10/23/openai-says-it-will-no-longer-train-its-ai-models-on-the-live-internet-citing-significant-risks/",
        "",
        "Outra cobertura: https://www.computing.co.uk/news/2026/ai/openai-cuts-live-internet-access-from-llm-training",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "COMPRAS",
    message:
      [
        "Oi! Os 5 prompts para planejar as compras do mês:",
        "",
        "1) Monte um cardápio de 7 dias para [pessoas] com orçamento de [valor].\n2) Transforme esse cardápio numa lista de compras por seção do mercado.\n3) Sugira trocas mais baratas para os 5 itens mais caros da lista.\n4) Tenho [ingredientes] sobrando. Que 3 refeições dá para fazer?\n5) Some os preços que eu colar e diga se passei do orçamento.",
        "",
        "Preços variam: confira no seu mercado.",
      ].join("\n") + signature,
    publicReply: "Te mandei os prompts no direct! 📩",
  },
  {
    keyword: "INICIANTE",
    message:
      [
        "Oi! O prompt para a IA explicar no seu nível:",
        "",
        "\"Explique [assunto] para um iniciante, com um exemplo do dia a dia. No fim, me faça 3 perguntas para eu testar se entendi.\"",
        "",
        "Se algo não fizer sentido, peça outro exemplo.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "AGENTE",
    message:
      [
        "Oi! Chatbot x agente de IA:",
        "",
        "Chatbot conversa: você pergunta e ele responde.\nAgente executa: usa ferramentas (navegador, arquivos, planilhas) e faz tarefas em vários passos.",
        "",
        "Exemplos de agente: pesquisar e montar um relatório, organizar arquivos, preencher planilhas. Antes de usar, veja quais acessos ele pede e revise o que ele fez.",
      ].join("\n") + signature,
    publicReply: "Te mandei os exemplos no direct! 📩",
  },
  {
    keyword: "MISTRAL",
    message:
      [
        "Oi! A matéria sobre o Mistral Large 4:",
        "https://thenewstack.io/mistral-large-4-weights/",
        "",
        "Outra cobertura: https://betanews.com/article/mistral-large-4-preview-open-weights/",
        "",
        "Os resultados de testes ainda são da própria Mistral.",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "MSGDIFICIL",
    message:
      [
        "Oi! Os 5 prompts para mensagens difíceis:",
        "",
        "1. Cobrar sem brigar: \"Escreva uma mensagem educada e firme cobrando [o quê] de [quem], que já atrasou [quanto].\"",
        "2. Dizer não: \"Me ajude a recusar [convite ou pedido] sem parecer grosso, em 3 frases.\"",
        "3. Pedir desconto: \"Escreva um pedido de desconto para [serviço], citando que sou cliente há [tempo].\"",
        "4. Pedir desculpas: \"Escreva um pedido de desculpas curto e sincero por [o que aconteceu], sem dar desculpas.\"",
        "5. Revisar o tom: \"Leia minha mensagem e diga se ela soa agressiva. Sugira uma versão mais calma: [cole].\"",
        "",
        "Leia antes de enviar e deixe com o seu jeito.",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "COMPARA",
    message:
      [
        "Oi! O prompt para comparar duas opções:",
        "",
        "\"Compare [opção A] e [opção B] numa tabela com prós, contras e custo. Meu caso: [explique]. No fim, diga qual você escolheria e por quê.\"",
        "",
        "Confira preços e dados na fonte antes de decidir.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "WEBAI",
    message:
      [
        "Oi! O anúncio oficial do WebAI da Opera:",
        "https://blogs.opera.com/news/2026/10/webai-local-ai-for-the-web-now-in-opera/",
        "",
        "Matéria do TechCrunch: https://techcrunch.com/2026/10/27/opera-introduces-a-new-web-standard-to-let-users-deploy-ai-locally-in-their-browser/",
        "",
        "É uma prévia no Opera One, opcional, e a velocidade depende do seu computador.",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "ICLOUD",
    message:
      [
        "Oi! Passo a passo para ligar o iCloud no ChatGPT:",
        "",
        "1. Crie uma senha específica de app em account.apple.com (não use sua senha normal).",
        "2. No ChatGPT: Configurações > Plugins > iCloud Mail ou iCloud Calendar.",
        "3. Mail: e-mail @icloud.com, @me.com ou @mac.com. Calendar: o e-mail principal da sua conta Apple.",
        "",
        "Matéria: https://www.macrumors.com/2026/10/27/chatgpt-icloud-mail-calendar-plugin/",
      ].join("\n") + signature,
    publicReply: "Te mandei o passo a passo no direct! 📩",
  },
  {
    keyword: "ORCAMENTO",
    message:
      [
        "Oi! Os 5 prompts para organizar seu orçamento:",
        "",
        "1. Para onde vai: \"Separe estes gastos em categorias e some cada uma: [cole os gastos].\"",
        "2. Onde cortar: \"Olhando essas categorias, onde dá para economizar sem mudar muito minha rotina?\"",
        "3. Meta: \"Quero juntar R$ [valor] em [meses]. Quanto preciso guardar por mês?\"",
        "4. Contas fixas: \"Monte um calendário com o dia de vencimento destas contas: [liste].\"",
        "5. Revisão: \"No fim do mês: compare o planejado com o gasto real e diga o que mudar.\"",
        "",
        "Nunca cole senha, número de cartão ou dados de banco na IA.",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "BAGUNCA",
    message:
      [
        "Oi! O prompt para organizar a bagunça:",
        "",
        "\"Transforme o texto abaixo numa lista de tarefas. Uma frase por tarefa, com prazo e prioridade (alta, média, baixa). Comece pela mais urgente: [cole tudo]\"",
        "",
        "Confira se nada ficou de fora.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "ROBOTS",
    message:
      [
        "Oi! O anúncio da OpenAI sobre o sinal de treino de IA no robots.txt:",
        "https://openai.com/index/helping-websites-express-ai-training-preferences",
        "",
        "Vale só para treino (não bloqueia busca) e ainda deve chegar nos próximos meses.",
      ].join("\n") + signature,
    publicReply: "Te mandei o anúncio no direct! 📩",
  },
  {
    keyword: "IPOCLAUDE",
    message:
      [
        "Oi! A matéria sobre o pedido da Anthropic para entrar na bolsa:",
        "https://www.cnbc.com/2026/10/26/anthropic-ipo-live-updates-ai-s-1-filing.html",
        "",
        "Comunicados da Anthropic: https://www.anthropic.com/news",
        "",
        "Isto não é recomendação de investimento.",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
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
