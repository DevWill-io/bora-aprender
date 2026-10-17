# 🚀 Guia Rápido - Bora Aprender

## ⚡ Setup em 5 passos

### 1️⃣ Instale as dependências

```bash
npm install
```

### 2️⃣ Configure o arquivo .env

Copie o arquivo de exemplo:
```bash
cp .env.example .env.local
```

Preencha com suas credenciais (veja como obter abaixo).

### 3️⃣ Obtenha suas credenciais

#### Firebase
1. Vá para https://console.firebase.google.com
2. Crie um novo projeto (ou use existente)
3. Vá em **Project Settings** > **Your apps** > clique no ícone web
4. Copie os valores para `VITE_FIREBASE_*`

#### Google OAuth
1. Vá para https://console.cloud.google.com
2. APIs & Services > Credentials
3. Create OAuth 2.0 Client ID (Web Application)
4. Adicione `http://localhost:5173` como authorized origin
5. Copie o Client ID para `VITE_GOOGLE_CLIENT_ID`

#### Gemini API
1. Vá para https://makersuite.google.com/app/apikey
2. Clique em "Create API Key"
3. Copie para `VITE_GEMINI_API_KEY`

### 4️⃣ Inicie o desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

### 5️⃣ Faça login com Google

Clique em "Entrar com Google" e comece a usar! 🎉

---

## 📦 Build para produção

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy na Vercel

```bash
npm install -g vercel
vercel
```

**Ou** conecte seu repositório Git diretamente no [vercel.com](https://vercel.com)

---

## 🔥 Checklist Final

- [x] Firebase configurado
- [x] Google OAuth configurado
- [x] Gemini API configurado
- [x] Arquivo .env.local preenchido
- [x] `npm install` executado
- [x] `npm run dev` funcionando
- [x] Login com Google funcionando

---

## 💡 Dicas

- Use `npm run build` antes de fazer deploy
- Nunca faça commit do arquivo `.env.local`
- Para produção, adicione variáveis de ambiente no painel da Vercel
- As questões estão em `src/data/questoes.json` (JSON local, não API)

---

## ❓ Problemas comuns?

**Erro "undefined VITE_FIREBASE_API_KEY"**
- Verifique se o arquivo `.env.local` existe e está preenchido

**Erro ao fazer login com Google**
- Verifique se `VITE_GOOGLE_CLIENT_ID` está correto
- Certifique-se de que `http://localhost:5173` está em "Authorized redirect URIs"

**Gemini AI não responde**
- Verifique se `VITE_GEMINI_API_KEY` está correto
- Certifique-se de que a API key é válida em https://makersuite.google.com

---

**Pronto para aprender? Vamos começar! 🚀**
