# 🎓 Bora Aprender - Plataforma Educacional Gamificada

Bem-vindo ao **Bora Aprender**! Uma plataforma educacional moderna, interativa e gamificada construída com React, Vite, Firebase e Gemini AI.

## 📋 Características Principais

- ✅ **Autenticação com Google** - Login seguro via Firebase Authentication
- 📊 **Dashboard Completo** - Acompanhe seu progresso com XP e Níveis
- 📝 **Simulados Cronometrados** - Teste seus conhecimentos
- ✏️ **Listas de Exercícios** - Pratique com questões personalizadas
- 🎥 **Videoaulas** - Integração com YouTube Data API
- 💬 **Chat Global** - Comunique-se com outros alunos em tempo real
- 🤖 **Tutor IA** - Tire suas dúvidas com Gemini AI
- 🎮 **Gamificação** - Sistema de XP e Níveis
- 🌙 **Dark Mode** - Tema claro e escuro com Glassmorphism
- 📱 **Responsivo** - Design mobile-first

## 🚀 Começando

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Conta Firebase (gratuita)
- Conta Google Cloud (para Gemini API)

### 1. Instalação

Clone ou extraia o projeto e instale as dependências:

```bash
cd boraaprender
npm install
```

### 2. Configuração do Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto ou use um existente
3. Vá para **Project Settings** > **Your apps**
4. Copie as credenciais

### 3. Configuração do Gemini API

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova API key (gratuita)

### 4. Configurar variáveis de ambiente

1. Renomeie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

2. Preencha com suas credenciais:

```env
# Firebase
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id

# Google OAuth
VITE_GOOGLE_CLIENT_ID=seu_google_client_id.apps.googleusercontent.com

# Gemini API
VITE_GEMINI_API_KEY=sua_gemini_api_key_aqui

# YouTube API (Opcional)
VITE_YOUTUBE_API_KEY=sua_youtube_api_key_aqui
```

### 5. Configurar Google OAuth

1. No [Google Cloud Console](https://console.cloud.google.com):
   - Vá para **APIs & Services** > **Credentials**
   - Crie uma nova **OAuth 2.0 Client ID** do tipo "Web"
   - Adicione URIs autorizados:
     - `http://localhost:5173`
     - `http://localhost:5173/login`
     - Sua URL de produção (ex: `https://seu-app.vercel.app`)

2. No Firebase Console:
   - Vá para **Authentication** > **Sign-in method**
   - Ative **Google** e adicione seu Client ID

### 6. Configurar Firestore

1. No Firebase Console:
   - Vá para **Firestore Database**
   - Crie uma nova database em modo teste (para desenvolvimento)
   - Estrutura de coleções será criada automaticamente pelo app

## 💻 Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

Gere a build de produção:

```bash
npm run build
```

A pasta `dist/` conterá os arquivos prontos para deploy.

## 🚀 Deploy na Vercel

### Método 1: Git (Recomendado)

1. Faça push do projeto no GitHub/GitLab
2. Acesse [Vercel](https://vercel.com) e conecte seu repositório
3. Configure as variáveis de ambiente no dashboard da Vercel
4. Clique em **Deploy**

### Método 2: CLI

1. Instale Vercel CLI:

```bash
npm install -g vercel
```

2. Na pasta do projeto:

```bash
vercel
```

3. Configure as variáveis de ambiente durante o setup

## 🔐 Segurança

- **Chaves privadas nunca devem estar no git** - Use apenas `.env.local` local
- **Firebase Rules** - Configure regras de segurança no Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chat/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /users/{uid}/stats/{document=**} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

## 📁 Estrutura de Pastas

```
boraaprender/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   └── LoadingScreen.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Exercicios.jsx
│   │   ├── Chat.jsx
│   │   ├── Simulados.jsx
│   │   ├── Aulas.jsx
│   │   └── TutorIA.jsx
│   ├── services/
│   ├── styles/
│   │   └── globals.css
│   ├── data/
│   │   └── questoes.json
│   ├── App.jsx
│   ├── main.jsx
│   └── firebaseConfig.js
├── .env.example
├── .env.local (não fazer commit!)
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Próximos Passos

- [ ] Implementar Timer Pomodoro
- [ ] Adicionar YouTube API integration
- [ ] Sistema de ranking global
- [ ] Certificados de conclusão
- [ ] Notificações push
- [ ] Integração com planos de estudo

## 🤝 Contribuindo

Sinta-se livre para contribuir com melhorias!

## 📧 Suporte

Para dúvidas ou problemas:
- Verifique a documentação do Firebase
- Leia sobre Gemini API em [ai.google.dev](https://ai.google.dev)

## 📄 Licença

Este projeto é de código aberto e disponível sob a MIT License.

---

**Feito com ❤️ para educadores e alunos**
