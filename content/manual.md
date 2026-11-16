# Manual da marca — Lino IA (@linoia.br)

Toda rotina (Fábrica, Fiscal, Analista) lê este arquivo antes de agir.
Seções "Dono:" só mudam quando o dono pede. Seções "Analista:" o Analista
reescreve toda segunda, com o número que justifica cada mudança.

## Dono: público e tom
- Público: brasileiros curiosos sobre IA, de pequenos empreendedores a quem só quer usar melhor o ChatGPT, o Claude e o Gemini. Não são técnicos.
- Objetivo agora: **audiência** (seguidores, compartilhamentos, salvamentos). Não vender serviços nos posts.
- Tom: direto, bem-humorado, frases curtas, sem jargão. Explicar como para um amigo esperto.
- Português do Brasil. "IA", não "AI". Valores em reais com a conversão quando a fonte está em dólar.

## Dono: regra de fonte
- Vale: comunicado, blog ou documentação oficial da empresa, ou imprensa confiável (TechCrunch, The Verge, Reuters, Folha, Estadão, Olhar Digital etc.).
- Post solto de rede social (X, Reddit, LinkedIn) só entra se uma dessas fontes confirmar; o post de origem pode ser citado junto.
- Número ou citação só com a fonte que o traz. Ressalvas da fonte vão no post ("liberando aos poucos", "só nos EUA", "em teste").
- Dia sem notícias verificadas suficientes: a vaga vira dica prática ou conceito. Nunca postar menos por falta de notícia.

## Dono: nunca fazer
- Publicar informação falsa, número inventado ou novidade sem fonte primária.
- Repetir tema ou palavra-chave dos últimos 14 dias (o validador barra).
- Prometer resultado, renda ou "ficar rico com IA". Clickbait que o vídeo não entrega.
- Usar marca, logo ou rosto de terceiros como se fossem nossos.
- Gastar créditos pagos (Kairogen) na produção diária.

## Dono: volume e redes
- 4 posts por dia: 3 vídeos (9:16, 15–30 s, narrados) + 1 carrossel (JPEG 1080×1350).
- Vídeos: Instagram Reels, Facebook Reels, TikTok e YouTube Shorts. Sem stories (cortados em 28/10 para caber no limite do plano do Metricool).
- Carrossel: Instagram (carrossel) e TikTok (fotos).

## Analista: pilares e proporção
Semana 09/11–15/11: sem números por post. A leitura do Instagram pelo Windsor foi bloqueada (plano grátis permite 1 conta conectada e há 3: instagram, instagram_public e tiktok_organic) e o Metricool não traz métricas por post do Instagram. Regras mantidas da semana 02/11–08/11 até haver dados:
- Mantém 2 notícias + 1 dica nos vídeos. Na semana anterior, notícia teve média 16,6 de alcance contra 13,1 das dicas/conceitos.
- Notícia só com efeito no dia a dia ou conflito (conta de luz 33, escola sem Google 27, falhas no Firefox 25). Notícia de mercado/empresa sem efeito para a pessoa foi mal (IPO da Anthropic 3, robots.txt 5).
- Dica precisa resolver um problema visível e concreto (print do erro 51). Conceito abstrato ou dica de estilo foi mal (imitar estilo 3).
- Sem notícia confirmada por duas fontes, a vaga vira dica (aplicado em 16/11).

## Analista: horários
- Carrossel continua às 09:00 porque o validador (automation/src/validate.ts) só aceita esse horário. Testar 11:00 continua recomendado (3–6 de alcance às 09:00 em 02/11–08/11), mas depende de o dono liberar a mudança no código.
- Vídeos às 12:30, 17:00 e 19:00. Médias de alcance em 02/11–08/11: 12:30 = 15,3; 17:00 = 13,0; 19:00 = 17,0. Mantém a notícia mais forte às 19:00.

## Analista: o que está funcionando
Dados de 09/11 a 15/11:
- Seguidores no Instagram: 13 → 12 (Metricool). TikTok, Facebook e YouTube não publicaram nada na semana porque a conta do Metricool atingiu o limite; todos os envios para essas redes deram ERROR.
- Instagram publicou 28 de 28 posts pelo Windsor, alguns com atraso: em 12/11 o das 12:30 saiu às 21:30 e o das 17:00 às 20:30, por queda da sessão.
- Não há números por post: o Windsor parou de liberar leituras até a conta ter só 1 conector (ou upgrade). Sem isso, o Analista não consegue medir alcance, salvamentos e compartilhamentos.
- Lições da semana anterior que continuam valendo: o gancho precisa prender em 1 segundo (cerca de 80% de pulo nos 3 primeiros segundos), começando pelo problema ou pelo número.

## Voz
- Narração por IA (Piper). Usa `voices/pt_BR-faber-medium.onnx` quando existir no repositório; senão `pt-br-edresson-low` (baixada do GitHub).
- Voz clonada do dono: depois (Kairogen, exige assinatura).
