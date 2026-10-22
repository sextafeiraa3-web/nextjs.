# Comentário → DM automática no Instagram

Quando alguém comenta a palavra-chave (por exemplo `GPT6`) num post ou Reels seu, o app manda uma mensagem automática no direct dessa pessoa. É o "comenta X que eu te mando no direct".

Usa a API oficial da Meta ("Private Replies"). Não precisa de ManyChat nem de nenhuma outra ferramenta paga.

## Como funciona

1. Alguém comenta no seu post ou Reels.
2. A Meta avisa o app em `/api/instagram/webhook` (código em `src/app/api/instagram/webhook/route.ts`).
3. Se o comentário tem uma das palavras-chave de `src/instagram/automations.ts`, o app manda a mensagem no direct e, se configurado, responde o comentário publicamente ("Te mandei no direct! 📩").

Regras da Meta:
- só 1 mensagem por comentário;
- até 7 dias depois do comentário;
- a mensagem chega na caixa principal se a pessoa te segue, ou em "Solicitações" se não segue;
- se a pessoa responder, você tem 24 h para continuar a conversa.

## Palavras-chave e mensagens

Edite `src/instagram/automations.ts`. Cada regra tem:

| Campo | Para quê |
|---|---|
| `keyword` | A palavra que a pessoa comenta. Ignora maiúsculas, acentos, espaços e pontuação: "gpt 6" e "Gpt6!" contam como `GPT6`. |
| `message` | O texto da DM (até 1000 caracteres). |
| `publicReply` | Opcional: resposta pública embaixo do comentário. |
| `mediaIds` | Opcional: limita a regra a posts ou Reels específicos. |

Depois de editar, faça o deploy de novo.

## Configuração (uma vez só)

### 1. Conta do Instagram
A conta precisa ser **profissional** (Empresa ou Criador de conteúdo): Configurações → Tipo de conta.

### 2. App na Meta
1. Em [developers.facebook.com](https://developers.facebook.com/), crie um app do tipo **Business**.
2. Adicione o produto **Instagram** → **API setup with Instagram login**.
3. Conecte sua conta do Instagram e gere um **token de acesso**, com as permissões `instagram_business_basic`, `instagram_business_manage_comments` e `instagram_business_manage_messages`.
4. Anote o **Instagram app secret**, que fica na mesma tela.

### 3. Publicar o app (deploy)
Publique este projeto Next.js (por exemplo na Vercel) e configure estas variáveis de ambiente:

| Variável | Valor |
|---|---|
| `INSTAGRAM_ACCESS_TOKEN` | O token do passo 2.3 |
| `INSTAGRAM_APP_SECRET` | O Instagram app secret do passo 2.4 |
| `INSTAGRAM_WEBHOOK_VERIFY_TOKEN` | Uma senha qualquer que você inventa (vai usar no passo 4) |
| `INSTAGRAM_GRAPH_VERSION` | Opcional, por exemplo `v24.0`. Sem ela, usa a versão padrão do app |

### 4. Webhook
No app da Meta, em **Instagram → Webhooks**:
- **Callback URL:** `https://SEU-DOMINIO/api/instagram/webhook`
- **Verify token:** o mesmo valor de `INSTAGRAM_WEBHOOK_VERIFY_TOKEN`
- Assine o campo **`comments`**.

### 5. Liberar para todo mundo
Enquanto o app está em modo de desenvolvimento, só funciona com comentários de contas que têm função no app (você e testadores). Para responder qualquer pessoa:
1. faça a **verificação da empresa** na Meta;
2. envie as permissões do passo 2.3 para **App Review** (pedindo Advanced Access);
3. coloque o app em modo **Live**.

### 6. Token
O token de longa duração vale 60 dias. Renove-o antes de vencer (pela API `refresh_access_token` ou gerando outro no painel) e atualize `INSTAGRAM_ACCESS_TOKEN`.

## Testar
Com o app publicado, comente a palavra-chave num post seu usando uma conta de teste. Os envios aparecem nos logs do servidor como `Instagram: sent "GPT6" DM to @usuario`, e os erros como `Instagram: could not answer comment ...`.

Fonte: [Send a Private Reply to a Commenter, Meta for Developers](https://developers.facebook.com/documentation/instagram-platform/private-replies)
