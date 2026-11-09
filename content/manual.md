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
Semana 02/11–08/11 (Instagram via Windsor, alcance por post; 28 posts):
- Notícia segue na frente: média 16,6 de alcance em 12 reels contra 13,1 das dicas/conceitos em 9 reels (8,4 sem o PRINTIA, que fez 51).
- Mantém 2 notícias + 1 dica nos vídeos.
- Notícia que funciona tem conflito ou efeito no dia a dia: OpenAI paga a conta de luz (33), escola sem IA fica sem Google (27), IA acha 81 falhas no Firefox (25), ChatGPT no e-mail do iPhone (22). Notícia de mercado/empresa sem efeito para a pessoa foi mal: IPO da Anthropic (3), robots.txt (5), Perplexity Teammates (9). Evitar esse tipo ou trocar o gancho para "o que muda para você".
- Dica que funciona resolve um problema visível e concreto: print do erro (51), revisão de texto (13), ata de reunião (13). Conceito abstrato ou dica de estilo foi mal: imitar estilo (3), resposta diferente (8), tabela de comparação (8).
- Carrossel: média 3,7 de alcance em 7 posts e nenhum salvamento pela 2ª semana. Mantém 1 por dia (regra do dono); testar 11:00 quando o dono liberar (ver horários).

## Analista: horários
- Carrossel continua às 09:00: o validador (automation/src/validate.ts) só aceita esse horário. Mudar para 11:00 é recomendado (3–6 de alcance às 09:00 nas duas semanas, média 3,7 nesta), mas depende de o dono liberar a mudança no código.
- Vídeos 12:30, 17:00 e 19:00. Médias de alcance: 12:30 = 15,3; 17:00 = 13,0; 19:00 = 17,0. Mantém a notícia mais forte às 19:00.

## Analista: o que está funcionando
Dados de 02/11 a 08/11 (Instagram via Windsor). Facebook, TikTok e YouTube não publicaram desde 05/11 19:00 (limite da conta do Metricool), então não há números deles nesta semana.
- Seguidores: Instagram 13 → 13; TikTok 186 → 186 (parado, sem posts).
- Melhores posts: "Apareceu um erro na tela? Mande o print." (51 de alcance, 64 views, 1 salvamento); "A OpenAI vai pagar a conta de luz da IA" (33); "Escola sem IA vai ficar sem Google?" (27).
- A segunda metade da semana rendeu o dobro: reels de 06–08/11 tiveram média 21,6 de alcance contra 10,3 em 02–05/11.
- Taxa de pulo nos 3 primeiros segundos ficou em torno de 80% em quase todos os reels (100% em IPO da Anthropic e imitar estilo). O gancho precisa prender em 1 segundo: começar pelo problema ou pelo número, sem introdução.
- Os reels com maior tempo médio assistido foram notícias com efeito direto: Siri em português (6,0 s), Uber (5,9 s), conta de luz (4,6 s).
- Compartilhamentos: zero em todos os 28 posts, mesmo com o "Manda para quem…" desde 04/11. Salvamentos: só 2 (ICLOUD e PRINTIA). Comentários de seguidores com palavra-chave: nenhum.

## Voz
- Narração por IA (Piper). Usa `voices/pt_BR-faber-medium.onnx` quando existir no repositório; senão `pt-br-edresson-low` (baixada do GitHub).
- Voz clonada do dono: depois (Kairogen, exige assinatura).
