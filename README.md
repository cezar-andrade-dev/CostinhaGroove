# 🎭 Costinha Soundboard — Fullstack

Soundboard interativo do Costinha com **frontend**, **API REST**, **banco de dados** e suporte a **armazenamento em nuvem**.

---

## 📁 Estrutura do Projeto

```
costinha-soundboard/
│
├── frontend/               ← Interface web (HTML + CSS + JS)
│   ├── index.html
│   ├── style.css
│   └── app.js              ← Consome a API via fetch()
│
├── backend/                ← Servidor Node.js + Express
│   ├── package.json
│   ├── .env.example        ← Copie para .env e preencha
│   ├── audio/              ← Coloque seus .mp3 aqui (modo local)
│   └── src/
│       ├── server.js       ← Ponto de entrada
│       ├── routes/
│       │   ├── piadas.js   ← GET /api/piadas
│       │   └── audio.js    ← GET /api/audio/:id
│       ├── controllers/
│       │   ├── piadasController.js
│       │   └── audioController.js
│       ├── middleware/
│       │   └── staticAudio.js  ← Serve .mp3 locais
│       └── db/
│           ├── database.js ← Conexão SQLite
│           └── seed.js     ← Popula o banco com as 30 piadas
│
├── .github/
│   └── workflows/
│       └── deploy.yml      ← CI/CD automático
│
├── vercel.json             ← Config de deploy do frontend
├── .gitignore
└── README.md
```

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/costinha-soundboard.git
cd costinha-soundboard
```

### 2. Configure o backend

```bash
cd backend

# Instala as dependências
npm install

# Copia o arquivo de configuração
cp .env.example .env

# Popula o banco de dados com as 30 piadas
npm run db:seed

# Coloque seus arquivos .mp3 na pasta audio/
# Nomeie como: piada01.mp3, piada02.mp3, ... piada30.mp3

# Inicia o servidor
npm run dev
```

O servidor estará rodando em **http://localhost:3000**

### 3. Abra o frontend

Abra `frontend/index.html` no navegador. Recomendado usar a extensão **Live Server** do VS Code para evitar problemas de CORS.

---

## 🌐 Rotas da API

| Método | Rota              | Descrição                     |
| ------ | ----------------- | ----------------------------- |
| GET    | `/`               | Confirma que a API está no ar |
| GET    | `/api/piadas`     | Lista todas as piadas         |
| GET    | `/api/piadas/:id` | Dados de uma piada específica |
| GET    | `/api/audio/:id`  | URL do áudio de uma piada     |

### Exemplo de resposta

```bash
# GET /api/piadas
[
  { "id": 1, "emoji": "😂", "titulo": "Não é possível!" },
  { "id": 2, "emoji": "🤣", "titulo": "Vou te contar uma coisa..." },
  ...
]

# GET /api/audio/1
{ "id": 1, "titulo": "Não é possível!", "url": "http://localhost:3000/audio/piada01.mp3" }
```

---

## ☁️ Deploy em produção

### Frontend → Vercel (gratuito)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Importe o repositório e aponte para a pasta `frontend/`
3. O deploy acontece automaticamente a cada `git push`

### Backend → Railway (gratuito)

1. Crie uma conta em [railway.app](https://railway.app)
2. Crie um novo projeto e aponte para a pasta `backend/`
3. Configure as variáveis de ambiente na aba **Variables**
4. O Railway detecta o Node.js automaticamente

### Áudios → Cloudflare R2 (gratuito até 10GB)

1. Crie uma conta em [cloudflare.com](https://cloudflare.com)
2. Vá em **R2 Storage** e crie um bucket público
3. Faça upload dos arquivos `.mp3`
4. No `.env` do backend, configure:

```env
AUDIO_STORAGE=s3
S3_PUBLIC_URL=https://pub-xxxx.r2.dev
```

---

## ⚙️ Variáveis de ambiente

| Variável           | Descrição                                        | Padrão               |
| ------------------ | ------------------------------------------------ | -------------------- |
| `PORT`             | Porta do servidor                                | `3000`               |
| `DB_PATH`          | Caminho do banco SQLite                          | `./data/costinha.db` |
| `AUDIO_STORAGE`    | Modo de armazenamento: `local` ou `s3`           | `local`              |
| `AUDIO_LOCAL_PATH` | Pasta dos .mp3 no modo local                     | `./audio`            |
| `S3_PUBLIC_URL`    | URL pública do bucket (modo s3)                  | —                    |
| `ALLOWED_ORIGINS`  | Origins permitidos pelo CORS (separados por `,`) | `*`                  |

---

## 🛠️ Tecnologias

**Frontend:** HTML5, CSS3, JavaScript vanilla

**Backend:** Node.js, Express, better-sqlite3

**Banco de dados:** SQLite (dev) — compatível com PostgreSQL em produção

**Deploy:** Vercel (frontend), Railway (backend), Cloudflare R2 (áudios)

**CI/CD:** GitHub Actions

---

## 📚 Conceitos aprendidos neste projeto

- Separação de responsabilidades (frontend ↔ backend)
- API REST com Express
- Banco de dados relacional com SQLite
- Variáveis de ambiente com dotenv
- CORS e comunicação entre origens diferentes
- Armazenamento de arquivos em nuvem
- Deploy e CI/CD automatizado

---

Feito com ❤️ e muitas risadas em homenagem ao **Costinha** — o eterno rei da gargalhada brasileira!
