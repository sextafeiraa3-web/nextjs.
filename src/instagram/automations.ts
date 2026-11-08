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
  {
    keyword: "VIAGEMIA",
    message:
      [
        "Oi! Os 5 prompts para planejar sua viagem:",
        "",
        "1. Roteiro: \"Monte um roteiro de [dias] dias em [cidade] para quem gosta de [coisas], sem correria.\"",
        "2. Orçamento: \"Tenho R$ [valor] para essa viagem. Divida entre transporte, hospedagem, comida e passeios.\"",
        "3. Mala: \"Faça uma lista de mala para [dias] dias em [cidade] em [mês], só o essencial.\"",
        "4. Plano B: \"Se chover em [cidade], o que dá para fazer perto do roteiro?\"",
        "5. Confira: \"Liste o que eu preciso confirmar no site oficial antes de ir: horários, preços e reservas.\"",
        "",
        "Confirme preços e horários no site oficial antes de ir.",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "CURRICULO",
    message:
      [
        "Oi! O prompt para ajustar o currículo para uma vaga:",
        "",
        "\"Esta é a vaga: [cole]. Este é meu currículo: [cole, sem dados pessoais]. Diga o que falta para essa vaga e reescreva os pontos fracos com frases mais fortes. Não invente nada.\"",
        "",
        "Tire telefone, endereço e documentos antes de colar. Revise tudo antes de enviar.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "DIFERENTE",
    message:
      [
        "Oi! Por que a IA responde diferente para a mesma pergunta:",
        "",
        "Ela monta o texto palavra por palavra, com um pouco de sorteio em cada escolha.",
        "",
        "Dicas:",
        "1. Não gostou? Peça outra versão.",
        "2. Quer respostas mais parecidas? Dê exemplos e um formato fixo.",
        "3. Número, data ou fato importante? Confira na fonte.",
      ].join("\n") + signature,
    publicReply: "Te mandei as dicas no direct! 📩",
  },
  {
    keyword: "IASOZINHA",
    message:
      [
        "Oi! O texto da Anthropic sobre IA que ajuda a construir a próxima IA:",
        "https://www.anthropic.com/institute/recursive-self-improvement",
        "",
        "Matéria do TechCrunch: https://techcrunch.com/2026/11/02/anthropic-warns-that-its-very-close-to-rsi-capability-aka-self-building-ai/",
        "",
        "A empresa diz que nenhum modelo chegou lá ainda.",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "GELADEIRA",
    message:
      [
        "Oi! Os 5 prompts para cozinhar com o que tem em casa:",
        "",
        "1. Geladeira: \"Tenho [ingredientes]. Me dê 3 receitas simples que usem só isso e o básico da despensa.\"",
        "2. Rápido: \"Uma receita com [ingrediente] que fique pronta em 15 minutos.\"",
        "3. Sobras: \"Sobrou [comida de ontem]. Como transformar em um prato novo?\"",
        "4. Cardápio: \"Monte um cardápio de 5 jantares baratos para [número] pessoas.\"",
        "5. Troca: \"Não tenho [ingrediente]. Pelo que posso trocar nessa receita?\"",
        "",
        "Confira tempo de preparo e alergias antes de servir.",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "CONTRATO",
    message:
      [
        "Oi! O prompt para entender um contrato antes de assinar:",
        "",
        "\"Explique este contrato em linguagem simples. Liste multas, prazos e obrigações, e diga 5 perguntas que eu deveria fazer antes de assinar: [cole, sem dados pessoais]\"",
        "",
        "Apague nome, CPF e endereço antes de colar. Isso não substitui um advogado.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "IMITA",
    message:
      [
        "Oi! O prompt para a IA escrever no seu estilo:",
        "",
        "\"Este é um texto meu: [cole]. Escreva sobre [novo assunto] com o mesmo tom, tamanho e jeito de falar. Não copie frases, só o estilo.\"",
        "",
        "Quanto mais parecido o exemplo com o que você quer, melhor o resultado.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "SIRIIA",
    message:
      [
        "Oi! Passo a passo para ativar a Siri com IA em português:",
        "",
        "1. Atualize o iPhone para o iOS 27.2.",
        "2. Ajustes > Siri > Idioma > Português (Brasil).",
        "3. Só funciona em iPhones compatíveis com a Apple Intelligence.",
        "",
        "Matéria: https://tecnoblog.net/noticias/ios-27-2-libera-nova-siri-em-portugues-no-brasil/",
      ].join("\n") + signature,
    publicReply: "Te mandei o passo a passo no direct! 📩",
  },
  {
    keyword: "IDIOMA",
    message:
      [
        "Oi! Os 5 prompts para praticar outro idioma com IA:",
        "",
        "1. Converse comigo em [idioma] sobre [assunto]. Corrija meus erros no fim de cada resposta.",
        "2. Fale comigo em [idioma] como se eu fosse iniciante. Frases curtas e palavras simples.",
        "3. Me ensine 10 palavras de [idioma] para [viagem, trabalho...], com uma frase de exemplo cada.",
        "4. Finja ser um garçom em [país]. Eu peço a comida em [idioma] e você responde.",
        "5. Corrija este texto que escrevi em [idioma] e explique cada erro em português: [texto]",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "REVISAO",
    message:
      [
        "Oi! O prompt para a IA corrigir sem mudar o seu jeito:",
        "",
        "\"Corrija só os erros de português deste texto, mantenha meu tom e meu tamanho, e depois liste cada mudança que você fez: [cole o texto]\"",
        "",
        "Com a lista, você decide o que aceitar.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "GIFIA",
    message:
      [
        "Oi! Como fazer GIF no ChatGPT (Images 2.6):",
        "",
        "1. Abra o ChatGPT e mande uma foto ou descreva a cena.",
        "2. Peça: \"transforme isto em um GIF animado\".",
        "3. Ajuste a velocidade ou edite quadro a quadro.",
        "4. Para reutilizar uma foto, salve com um nome e chame depois com @nome.",
        "",
        "Anúncio da OpenAI: https://openai.com/index/introducing-images-2-6/",
      ].join("\n") + signature,
    publicReply: "Te mandei o passo a passo no direct! 📩",
  },
  {
    keyword: "UBERIA",
    message:
      [
        "Oi! A matéria sobre os agentes de IA no Uber:",
        "",
        "Na semana do Halloween, a mais movimentada de outubro, só 4 corridas foram pedidas por agentes de IA, e cerca de 500 pedidos no Uber Eats.",
        "",
        "TechCrunch: https://techcrunch.com/2026/11/04/almost-no-one-uses-ai-agents-to-book-their-uber-company-says/",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "FAXINA",
    message:
      [
        "Oi! Os 5 prompts para organizar a casa com IA:",
        "",
        "1. Tenho [30 minutos]. Monte uma faxina rápida para [cômodos], em ordem.",
        "2. Divida as tarefas da casa em 7 dias, com no máximo 20 minutos por dia.",
        "3. Divida estas tarefas de forma justa entre [pessoas e idades]: [tarefas].",
        "4. Como tirar [mancha] de [tecido] com o que tenho em casa? Quais cuidados?",
        "5. Me faça perguntas para decidir o que guardar, doar ou jogar fora de [lugar].",
        "",
        "Produto de limpeza: leia o rótulo e nunca misture sem conferir.",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "ATAIA",
    message:
      [
        "Oi! O prompt para transformar anotações em ata:",
        "",
        "\"Transforme estas anotações de reunião em uma ata com: decisões tomadas, tarefas com responsável e prazo, e pontos em aberto. Não invente nada: [cole as anotações]\"",
        "",
        "Tire dados sensíveis antes de colar e confira antes de enviar.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "ENERGIAIA",
    message:
      [
        "Oi! O compromisso da OpenAI sobre energia dos data centers:",
        "",
        "Ela promete pagar toda a eletricidade que usa, divulgar o consumo de água e energia de cada local e não assinar acordos de sigilo com autoridades. Vale só para os data centers que ela tem e opera.",
        "",
        "OpenAI: https://openai.com/index/setting-new-standard-responsible-ai-infrastructure/",
        "CNBC: https://www.cnbc.com/2026/11/05/openai-to-pay-for-data-center-power-after-election-shows-ai-concern.html",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "ESCOLAIA",
    message:
      [
        "Oi! A matéria sobre o Google e as escolas:",
        "",
        "A partir de 2027, Gemini e Busca vêm desligados para alunos nos EUA. Se a escola bloquear toda a IA, os alunos perdem também a Busca. O Google diz que cada ferramenta pode ser ligada separadamente.",
        "",
        "TechCrunch: https://techcrunch.com/2026/11/03/google-will-let-schools-disable-its-ai-tools-but-not-without-sacrificing-search/",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "PRESENTEIA",
    message:
      [
        "Oi! Os 5 prompts para escolher um presente com IA:",
        "",
        "1. Me dê 10 ideias de presente para [pessoa], que gosta de [gostos], até R$ [valor].",
        "2. Sugira 5 presentes que sejam experiências, não objetos, para [pessoa] em [cidade].",
        "3. Que presente eu consigo fazer em casa para [pessoa] com até R$ [valor]?",
        "4. Escreva uma mensagem curta e sincera para [pessoa] sobre [lembrança].",
        "5. Estou em dúvida entre [opção A] e [opção B] para [pessoa]. Prós e contras de cada.",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "PRINTIA",
    message:
      [
        "Oi! O prompt para a IA explicar um erro pelo print:",
        "",
        "\"Este é um print de um erro no meu [celular/computador/site]. Explique o que ele significa e me dê o passo a passo para resolver, em linguagem simples. Se não tiver certeza, diga.\"",
        "",
        "Cubra senhas e dados pessoais antes de enviar.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "PERPLEXITY",
    message:
      [
        "Oi! Sobre os Teammates da Perplexity:",
        "",
        "São agentes que recebem um objetivo, dividem em tarefas, trabalham em paralelo e lembram o histórico do projeto. Por enquanto é um teste, na web, só no plano Max.",
        "",
        "Anúncio: https://www.perplexity.ai/hub/blog/teammates-are-agents-for-complex-ongoing-work",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "BRECHAIA",
    message:
      [
        "Oi! Sobre a IA que achou falhas no Firefox:",
        "",
        "O GPT-6 Cyber, da OpenAI, encontrou 81 falhas graves inéditas no Firefox, que a Mozilla já está corrigindo. Mantenha o navegador atualizado: no Firefox, menu > Ajuda > Sobre o Firefox.",
        "",
        "OpenAI: https://openai.com/index/introducing-gpt-6-cyber/",
        "Axios: https://www.axios.com/2026/11/05/openai-linux-cyber-model",
      ].join("\n") + signature,
    publicReply: "Te mandei a matéria no direct! 📩",
  },
  {
    keyword: "CRIANCAIA",
    message:
      [
        "Oi! Os 5 prompts para planejar programas com crianças:",
        "",
        "1. Sugira 5 brincadeiras em casa para crianças de [idade], sem gastar nada.",
        "2. Está chovendo. Monte uma tarde divertida para [idades] com o que tenho em casa.",
        "3. Ideias de passeio barato com crianças de [idade] em [cidade]. Confirme horários no site oficial.",
        "4. Uma receita simples que crianças de [idade] possam ajudar a fazer, com supervisão.",
        "5. Crie uma história curta para dormir sobre [tema], para uma criança de [idade].",
      ].join("\n") + signature,
    publicReply: "Te mandei os 5 prompts no direct! 📩",
  },
  {
    keyword: "YTRESUMO",
    message:
      [
        "Oi! O prompt para resumir vídeo do YouTube no Gemini:",
        "",
        "\"[cole o link do YouTube] Resuma este vídeo em 5 pontos, com o minuto de cada um, e diga que parte vale assistir inteira.\"",
        "",
        "Confira no vídeo qualquer informação importante.",
      ].join("\n") + signature,
    publicReply: "Te mandei o prompt no direct! 📩",
  },
  {
    keyword: "CIENCIAIA",
    message:
      [
        "Oi! O estudo da Anthropic sobre IA na pesquisa:",
        "",
        "Analisou 207 mil sessões com o Claude e ouviu 528 cientistas. Estimativa: em estatística e computação a produção pode quase dobrar. É um modelo, não uma medição.",
        "",
        "Estudo: https://www.anthropic.com/research/how-researchers-use-claude",
      ].join("\n") + signature,
    publicReply: "Te mandei o estudo no direct! 📩",
  },
  {
    keyword: "MUSEVOZ",
    message:
      [
        "Oi! Sobre o Muse Voice da Meta:",
        "",
        "Conversa por voz em tempo real com um avatar animado, no celular, na web e no Mac. Por enquanto só nos EUA.",
        "",
        "Meta: https://about.fb.com/news/2026/11/introducing-muse-ai-voice-expressive-avatars/",
        "TechCrunch: https://techcrunch.com/2026/11/05/meta-says-us-users-can-now-video-chat-with-their-muse-ai-avatar/",
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
