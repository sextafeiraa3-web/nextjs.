# Reels da Lino IA (Remotion)

Vídeos verticais (1080×1920, 30 fps) feitos em React com [Remotion](https://www.remotion.dev/). Cada Reel é uma composição em `src/Root.tsx`.

| Composição | Pasta | Palavra do comentário |
|---|---|---|
| `Gpt6IntelligentUi` | `src/gpt6/` | GPT6 |
| `SmartTvAds` | `src/smart-tv/` | TV |
| `AgentMonitor` | `src/agent-monitor/` | ALARME |
| `LockedChats` | `src/locked-chats/` | CADEADO |

As peças compartilhadas ficam em `src/components/`:
- `Reel`: fundo e o @linoia.br;
- `CommentCta`: o cartão final "Comente X que eu te mando no direct".

O tema fica em `src/theme.ts` (cores, fontes locais e animações). A palavra do comentário precisa estar também em `src/instagram/automations.ts` do app Next.js, que é quem manda a DM.

Os vídeos prontos e as legendas dos posts ficam em `renders/`.

## Comandos

```bash
npm i                      # instalar
npm run dev                # Remotion Studio, para ver e ajustar
npm run lint               # eslint + tsc
npx remotion render SmartTvAds renders/smart-tv-sem-anuncio.mp4
npx remotion still SmartTvAds out/hook.png --frame=0   # conferir o gancho
```

Na nuvem do Claude Code o Remotion não consegue baixar o navegador; use o já instalado:
`--browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`

Regras dos ganchos:
- a frase principal aparece desde o quadro 0, porque ele vira a capa;
- todo texto importante fica entre 200 px e 1330 px de altura, fora da interface do Instagram.

Remotion é gratuito para pessoas físicas e empresas de até 3 pessoas. Acima disso, exige licença: https://www.remotion.pro/license
