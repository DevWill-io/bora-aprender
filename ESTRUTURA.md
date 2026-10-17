# 📁 Estrutura do Projeto - Bora Aprender

```
boraaprender-complete/
│
├── 📄 QUICKSTART.md              # Guia rápido de início (LEIA PRIMEIRO!)
├── 📄 README.md                  # Documentação completa
├── 📄 ESTRUTURA.md              # Este arquivo
├── 📄 package.json              # Dependências do projeto
├── 📄 vite.config.js            # Configuração do Vite
├── 📄 .env.example              # Template de variáveis de ambiente
├── 📄 .gitignore                # Arquivo para ignorar no Git
│
├── 📁 public/
│   └── index.html               # Arquivo HTML principal
│
└── 📁 src/                       # Código-fonte da aplicação
    │
    ├── 📄 main.jsx              # Entry point da aplicação
    ├── 📄 App.jsx               # Componente raiz com rotas
    ├── 📄 firebaseConfig.js      # Configuração do Firebase
    │
    ├── 📁 contexts/
    │   └── AuthContext.jsx       # Contexto de autenticação (Google OAuth)
    │
    ├── 📁 components/            # Componentes reutilizáveis
    │   ├── Layout.jsx            # Layout principal com sidebar/bottom nav
    │   ├── Layout.css
    │   ├── LoadingScreen.jsx     # Tela de carregamento
    │   └── LoadingScreen.css
    │
    ├── 📁 pages/                 # Páginas da aplicação
    │   ├── Login.jsx             # 🔐 Página de login com Google
    │   ├── Login.css
    │   ├── Dashboard.jsx         # 📊 Dashboard com estatísticas
    │   ├── Dashboard.css
    │   ├── Exercicios.jsx        # ✏️ Listas de exercícios com filtros
    │   ├── Exercicios.css
    │   ├── Chat.jsx              # 💬 Chat global em tempo real
    │   ├── Chat.css
    │   ├── Simulados.jsx         # 📝 Simulados cronometrados
    │   ├── Simulados.css
    │   ├── Aulas.jsx             # 🎥 Videoaulas (YouTube)
    │   ├── Aulas.css
    │   ├── TutorIA.jsx           # 🤖 Tutor IA com Gemini
    │   └── TutorIA.css
    │
    ├── 📁 styles/
    │   └── globals.css           # Estilos globais, Glassmorphism, Dark/Light Mode
    │
    └── 📁 data/
        └── questoes.json         # Banco de questões em JSON local
```

---

## 📌 O que cada arquivo faz

### 🔧 Configuração
- **vite.config.js** - Configuração de build e dev server
- **firebaseConfig.js** - Inicializa Firebase com variáveis de ambiente
- **.env.example** - Template para credenciais (copiar para .env.local)
- **package.json** - Dependências e scripts

### 🎨 Componentes Principais

#### **Layout.jsx**
- Navbar superior com logo e botões
- Sidebar retrátil para desktop
- Bottom navigation para mobile
- Toggle de tema (dark/light mode)
- Botão de logout

#### **AuthContext.jsx**
- Gerencia login com Google
- Protege rotas privadas
- Mantém sessão do usuário
- Usa Firebase Authentication

### 📄 Páginas

| Página | Arquivo | Função |
|--------|---------|--------|
| Login | `Login.jsx` | Autenticação com Google (pública) |
| Dashboard | `Dashboard.jsx` | Home do aluno (XP, nível, stats) |
| Exercícios | `Exercicios.jsx` | Listas personalizáveis + feedback |
| Chat | `Chat.jsx` | Mensagens em tempo real (Firestore) |
| Simulados | `Simulados.jsx` | Provas cronometradas |
| Aulas | `Aulas.jsx` | Playlists de vídeos (YouTube API) |
| Tutor IA | `TutorIA.jsx` | Chat com Gemini API |

### 🎨 Estilos

#### **globals.css** - Contém:
- Variáveis CSS para Light Mode e Dark Mode
- Glassmorphism (backdrop-filter, blur)
- Sistema de cores e espaçamento
- Animações (fadeIn, slideIn, pulse, spin)
- Responsividade (mobile-first)
- Componentes genéricos (glass, card, badge, etc)

---

## 🔌 Integrações

### Firebase
```
✅ Authentication (Google OAuth)
✅ Cloud Firestore (Chat, Stats)
```

### APIs
```
📍 Gemini API - Tutor IA
📹 YouTube Data API - Videoaulas (config no .env)
```

### JSON Local
```
📚 questoes.json - Banco de questões de exemplo
```

---

## 🚀 Como começar?

1. **Leia** `QUICKSTART.md` (guia de 5 passos)
2. **Configure** `.env.local` com suas credenciais
3. **Instale** dependências: `npm install`
4. **Inicie** servidor: `npm run dev`
5. **Acesse** `http://localhost:5173`

---

## 🛠️ Stack Técnico

```
Frontend:
- React 18
- Vite (build tool)
- React Router DOM (rotas)
- lucide-react (ícones)

Backend/Dados:
- Firebase (Auth + Firestore)
- Gemini AI (Chat IA)
- YouTube Data API (Vídeos)

Styling:
- CSS Puro com Variáveis
- Glassmorphism
- Dark Mode / Light Mode
- Responsive Design
```

---

## 📊 Features por Página

### 🔐 Login
- Botão "Entrar com Google"
- Design moderno com Glassmorphism
- Features showcase
- Redirect automático pós-login

### 📊 Dashboard
- Card com XP e barra de progresso
- Estatísticas de simulados, exercícios
- Tempo total de estudo
- Quick access links

### ✏️ Exercícios
- Filtro por matéria
- Filtro por dificuldade
- Múltipla escolha
- Correção automática
- Relatório de desempenho
- Explicações das respostas

### 💬 Chat
- Mensagens em tempo real (Firestore)
- Avatar do usuário
- Timestamps
- Scroll automático para mensagem nova

### 📝 Simulados
- Card com duração e questões
- Info de dificuldade
- Status "em construção"

### 🎥 Aulas
- Categorização por matéria
- Cards de playlist
- Contagem de vídeos
- Botão para assistir (configurável)

### 🤖 Tutor IA
- Chat com Gemini
- Loading dots animation
- Histórico de conversa
- Formatação de hora

---

## 🔐 Segurança

- Chaves nunca expostas (variáveis de ambiente)
- Firestore Rules (autorização)
- Firebase Auth Token (sessão)
- HTTPS obrigatório em produção

---

## ✅ Status de Desenvolvimento

- [x] Estrutura completa
- [x] Autenticação
- [x] Dashboard
- [x] Exercícios com questões
- [x] Chat em tempo real
- [x] Tutor IA
- [x] Layout responsivo
- [x] Dark/Light Mode
- [x] Glassmorphism
- [ ] Timer Pomodoro (próximo)
- [ ] YouTube API integration (próximo)
- [ ] Ranking global (próximo)

---

**Pronto para deploy! 🚀**
