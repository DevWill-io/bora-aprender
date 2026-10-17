// TutorIA.jsx - Chat privado com Tutor IA (Gemini)
import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import './TutorIA.css'

function TutorIA({ user }) {
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      tipo: 'bot',
      conteudo: 'Olá! 👋 Sou seu Tutor IA. Estou aqui para ajudar você com dúvidas sobre qualquer assunto. Qual matéria você gostaria de estudar?',
      timestamp: new Date()
    }
  ])
  const [entrada, setEntrada] = useState('')
  const [carregando, setCarregando] = useState(false)
  const messagesEndRef = useRef(null)
  const genAI = useRef(null)

  // Scroll para última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensagens])

  // Inicializar Gemini
  useEffect(() => {
    if (import.meta.env.VITE_GEMINI_API_KEY) {
      genAI.current = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
    }
  }, [])

  // Enviar mensagem para IA
  const handleEnviar = async (e) => {
    e.preventDefault()

    if (!entrada.trim() || !genAI.current) return

    // Adicionar mensagem do usuário
    const novaMensagemUsuario = {
      id: Date.now(),
      tipo: 'usuario',
      conteudo: entrada,
      timestamp: new Date()
    }

    setMensagens(prev => [...prev, novaMensagemUsuario])
    setEntrada('')
    setCarregando(true)

    try {
      const model = genAI.current.getGenerativeModel({ model: 'gemini-pro' })

      const chat = model.startChat({
        history: mensagens
          .filter(m => m.id !== 1)
          .map(m => ({
            role: m.tipo === 'usuario' ? 'user' : 'model',
            parts: [{ text: m.conteudo }]
          }))
      })

      const result = await chat.sendMessage(entrada)
      const respostaIA = result.response.text()

      // Adicionar resposta da IA
      const novaMensagemIA = {
        id: Date.now() + 1,
        tipo: 'bot',
        conteudo: respostaIA,
        timestamp: new Date()
      }

      setMensagens(prev => [...prev, novaMensagemIA])
    } catch (error) {
      console.error('Erro ao chamar Gemini:', error)
      
      // Mostrar mensagem de erro
      const mensagemErro = {
        id: Date.now() + 1,
        tipo: 'bot',
        conteudo: '❌ Desculpe, ocorreu um erro. Verifique se sua chave Gemini está configurada no .env',
        timestamp: new Date()
      }

      setMensagens(prev => [...prev, mensagemErro])
    } finally {
      setCarregando(false)
    }
  }

  const formatarHora = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="tutor-ia">
      <div className="tutor-header glass">
        <h1>🤖 Tutor IA</h1>
        <p>Converse com a inteligência artificial para tirar suas dúvidas</p>
      </div>

      <div className="tutor-container">
        {/* Mensagens */}
        <div className="mensagens-ia-list">
          {mensagens.map((msg) => (
            <div 
              key={msg.id}
              className={`mensagem-ia ${msg.tipo}`}
            >
              <div className="mensagem-ia-conteudo">
                {msg.tipo === 'bot' && (
                  <span className="ia-icon">🤖</span>
                )}
                <div className="ia-texto">
                  <p>{msg.conteudo}</p>
                  <span className="hora-ia">{formatarHora(msg.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
          {carregando && (
            <div className="mensagem-ia bot">
              <div className="mensagem-ia-conteudo">
                <span className="ia-icon">🤖</span>
                <div className="ia-texto">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulário */}
        <form className="tutor-form glass" onSubmit={handleEnviar}>
          <input
            type="text"
            placeholder="Faça sua pergunta..."
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            disabled={carregando}
            maxLength="500"
          />
          <button 
            type="submit"
            disabled={carregando || !entrada.trim()}
            title="Enviar"
          >
            {carregando ? <Loader size={20} className="spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TutorIA
