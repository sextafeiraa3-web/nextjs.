# Lino IA — produção e publicação diária automática (design)

Data: 27/10/2026 · Dono: @linoia.br (sextafeiraa3-web)

## 1. Intenção e porquê

O @linoia.br quer **audiência** (vender vem depois) falando de IA: ensinar
conceitos de forma simples, dar dicas práticas, usar ganchos fortes e surfar no
que está em alta na semana.

Hoje o crescimento trava por **falta de constância**, não por falta de ideia:

- Não existe rotina de publicação diária. Os posts saíram em lotes nos dias em
  que alguém abriu uma sessão (14, 15, 20, 22 e 27/10); nos outros dias, nada.
- As ferramentas de vídeo (Remotion, HyperFrames, skill `lino-reels`) vivem no
  branch `ccr-c33fe83d-kjjc3w`, nunca mesclado. Sessões novas não as têm.
- Falhas silenciosas: o carrossel da Ghost Core (14/10) falhou no TikTok
  (PNG não aceito, só JPEG); o lote de 26/10 foi agendado só para Instagram.
- As métricas de TikTok no Metricool pararam de sincronizar em 18/10.

Números de partida (Metricool, 1–27/10): Instagram 12 seguidores, alcance de
5–140 por post; TikTok 20 seguidores, até 634 views por vídeo (10–50× o
Instagram); YouTube 187 inscritos, quase sem posts; quase zero compartilhamentos.
No Instagram, notícia com polêmica ("IA desligou o alarme e mentiu", "trancar
conversa com senha") rendeu ~10× mais que dica de prompt.

## 2. Objetivos, não-objetivos e anti-objetivos

**Objetivos**
- Publicar **todo dia, sem intervenção**: 4 posts/dia no TikTok e no Instagram
  (3 vídeos motion + 1 carrossel) e os 3 vídeos também como YouTube Shorts.
- Saber, todo dia, se cada post saiu em cada rede; consertar ou avisar.
- O dono muda o rumo (temas, tom, formatos, horários) sem mexer em código,
  e o sistema aprende sozinho com as métricas toda semana.

**Não-objetivos (por agora)**
- Vender, captar leads ou falar de serviços da Lino IA nos posts de audiência.
- Anúncios pagos. Facebook continua recebendo o que já recebe, sem foco.
- Aprovação humana antes de publicar (decisão do dono: automático).

**Anti-objetivos (seria fracasso mesmo funcionando)**
- Publicar informação falsa, número inventado ou novidade sem fonte primária.
- Repetir o mesmo tema/gancho em dias seguidos ou virar spam de "comente PROMPT".
- Ficar dias sem postar sem que o dono saiba.
- Gastar créditos pagos (Kairogen) para o volume diário.

## 3. Restrições

- Execução em **Routines do Claude Code na nuvem** (create_trigger), repo
  `sextafeiraa3-web/nextjs.` (público), branch padrão
  `claude/instagram-playlist-copy-gtf2ha`.
- Publicação via **Metricool** (brand `7384024`, fuso `America/Sao_Paulo`);
  mídia por URL raw do GitHub fixada no SHA do commit (padrão já usado pela
  `lino-reels`).
- Vídeo renderizado localmente no container (Remotion/HyperFrames + ffmpeg +
  Chromium pré-instalado). Sem créditos pagos.
- TikTok: fotos só em JPEG/WebP; `tiktokData.title` obrigatório.
- Instagram (conta business): música só do catálogo licenciado da Meta
  (atual: `364588399541989`). TikTok/Facebook/YouTube sem música via API.
- Já existem e continuam: rotina de comentários do Instagram
  (`trig_01RC39TqSPLiCydgDCmT1dmc`, 5×/dia) e "Radar semanal Lino IA"
  (`trig_014jzin9iZPYCuLqMKhHQKtM`, segundas 07:53).
- Identidade visual: Noite `#070B1A`, Elétrico `#2F6BFF`, Ciano `#22D3EE`,
  Lima `#C6FF3D`, Gelo `#F5F7FF`; Inter Display Black nos títulos.

## 4. Abordagens consideradas

| | Abordagem | Troca |
|---|---|---|
| A | Uma rotina diária faz tudo (pesquisa → cria → agenda → confere) | Simples, mas uma falha derruba o dia inteiro sem aviso |
| **B** | **Fábrica (madrugada, dia seguinte) + Fiscal (várias vezes/dia) + Analista (semanal)** | Mais peças, mas uma falha não derruba o dia e sempre há conferência |
| C | Pipeline em código (GitHub Actions + API de LLM) | Previsível, mas exige chaves e mais construção e perde o julgamento editorial |

**Escolhida: B** (dono aceitou a recomendação em 27/10). Motivo: o problema
real tem sido constância e falha silenciosa; B ataca os dois.

## 5. O que foi decidido

### 5.1 Base no branch padrão
Mesclar no branch padrão as ferramentas do `ccr-c33fe83d-kjjc3w` (projeto
`videos/reels` em Remotion, `videos/*` HyperFrames, skills de vídeo,
`lino-reels`, `src/instagram/automations.ts`). Sem isso nenhuma rotina tem as
ferramentas.

### 5.2 Manual da marca (arquivo que manda em tudo)
Um arquivo versionado no repo (ex.: `content/manual.md`) que **toda rotina lê
antes de agir**. Contém: público, tom, pilares de conteúdo e proporção, formatos,
grade de horários, regras de fonte e verificação, lista do que nunca fazer,
palavras-chave de comentário, e uma seção "o que está funcionando" escrita pelo
Analista. Mudar o rumo = editar esse arquivo (o dono pede numa sessão; a próxima
Fábrica já obedece).

Junto, um **registro do que já foi publicado** (ex.: `content/log/`) com tema,
gancho, formato, redes, horários, IDs no Metricool e status por rede. Serve para
não repetir tema e para o Fiscal e o Analista.

### 5.3 Mix diário (padrão inicial, ajustável no manual)
- 3 vídeos motion verticais 1080×1920, ~18–20 s, gancho na tela no frame 0,
  algo se move a cada 2–4 s, fechamento "Comente X". Vão para **Instagram Reels,
  TikTok e YouTube Shorts** (e Facebook Reel, como hoje).
- 1 carrossel de slides em **JPEG** 1080×1350 (ou 1080×1920 no TikTok, a
  critério do builder). Vai para **Instagram (carrossel) e TikTok (fotos)**.
- Story no Instagram/Facebook 30 min após cada reel, como hoje.
- Pilares: notícia em alta com polêmica/surpresa, dica prática com prompt,
  conceito de IA explicado simples, gancho/curiosidade. O Analista ajusta a
  proporção pelos números; ponto de partida: notícias/curiosidade na maioria dos
  vídeos (melhor resultado medido), dica prática no carrossel.
- Horários iniciais: espalhados de manhã à noite com o gancho mais forte às 19h;
  depois usar `getBestTimeToPostByNetwork` do Metricool.

### 5.4 Fábrica (todo dia, madrugada)
Cria e agenda os 4 posts **do dia seguinte**:
1. Lê o manual e o registro.
2. Pesquisa novidades (fontes da `lino-reels` e do Radar) e escolhe 4 temas
   novos; **verifica cada fato na fonte primária**; sem fonte, não entra.
3. Gera os 3 vídeos e o carrossel; checa lint/tipos; renderiza; inspeciona
   quadros-chave (frame 0 e meio de cada cena) para sobreposição de texto.
4. Escreve legendas no formato da `lino-reels` e o título do TikTok/YouTube.
5. Faz commit e push (mídia + legendas + registro) e agenda no Metricool com URL
   raw fixada no SHA, em todas as redes do mix.
6. Confere com `getScheduledPosts` que cada post tem todas as redes previstas.
7. Se não conseguir completar algum post, publica os que conseguiu e avisa.

### 5.5 Fiscal (várias vezes ao dia)
Depois de cada horário de publicação: lê o status por rede no Metricool. Para
`ERROR`, corrige o que for mecânico (ex.: converter PNG→JPEG, faltou título) e
reagenda; o que não conseguir, avisa o dono no celular com post, rede e erro.
Atualiza o status no registro. Se a Fábrica não deixou nada agendado para hoje,
avisa logo cedo (e pode disparar a Fábrica de novo).

### 5.6 Analista (semanal)
Lê as métricas da semana (alcance, views, compartilhamentos, salvamentos,
seguidores ganhos por post e por rede), compara pilares, formatos, ganchos e
horários e reescreve a seção "o que está funcionando" e a proporção de pilares
no manual. Manda ao dono um resumo curto: seguidores por rede, top 3 posts, o
que mudou no manual.

### 5.7 Avisos ao dono
Push no celular só quando algo exige atenção (falha não resolvida, dia sem posts)
e o resumo semanal do Analista. Silêncio = tudo saiu.

## 6. Pendências do lado do dono
- Reconectar o TikTok no Metricool (as métricas pararam em 18/10).
- Confirmar que o YouTube está liberado para publicar Shorts via Metricool.

## 7. Deixado para quem for construir
- Formato exato do manual e do registro (Markdown/JSON), nomes de pastas.
- Usar Remotion ou HyperFrames para cada formato, e templates reutilizáveis.
- Horários exatos das rotinas (Fábrica, Fiscal) e quantas passagens do Fiscal.
- Se o carrossel é gerado em HTML→JPEG (Playwright) ou outro meio.
- Como reaproveitar ou substituir o "Radar semanal" (manter, fundir na Fábrica
  ou no Analista).
- Como resolver o merge do branch de vídeo (753 arquivos) com o padrão.
- Modelo usado por cada rotina e limites de tempo de execução.
