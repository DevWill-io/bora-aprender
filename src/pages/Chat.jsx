// Chat.jsx - Chat global em tempo real com Firestore
import React, { useState, useEffect, useRef } from 'react'
import { db } from '../firebaseConfig'
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'
import { Send } from 'lucide-react'
import './Chat.css'

function Chat({ user }) {
  const [mensagens, setMensagens] = useState([])
  const [novaMensagem, setNovaMensagem] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensagens])

  // Carregar mensagens do Firestore
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'chat'),
        orderBy('timestamp', 'asc'),
        limit(50)
      )

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        }))
        setMensagens(msgs)
        setCarregando(false)
      })

      return unsubscribe
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
      setCarregando(false)
    }
  }, [])

  // Enviar mensagem
  const handleEnviar = async (e) => {
    e.preventDefault()
    
    if (!novaMensagem.trim()) return

    try {
      setEnviando(true)
      await addDoc(collection(db, 'chat'), {
        usuario: user.displayName,
        email: user.email,
        fotoPerfil: user.photoURL,
        mensagem: novaMensagem.trim(),
        timestamp: serverTimestamp(),
        uid: user.uid
      })
      setNovaMensagem('')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setEnviando(false)
    }
  }

  const formatarHora = (date) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="chat">
      <div className="chat-header glass">
        <h1>💬 Chat Global</h1>
        <p>Converse com outros alunos em tempo real</p>
      </div>

      <div className="chat-container">
        {/* Mensagens */}
        <div className="mensagens-list">
          {carregando ? (
            <div className="loading-chat">Carregando mensagens...</div>
          ) : mensagens.length === 0 ? (
            <div className="empty-chat">
              <p>Nenhuma mensagem ainda. Seja o primeiro a falar! 👋</p>
            </div>
          ) : (
            mensagens.map((msg) => (
              <div 
                key={msg.id} 
                className={`mensagem ${msg.uid === user.uid ? 'propria' : 'outro'}`}
              >
                {msg.uid !== user.uid && msg.fotoPerfil && (
                  <img 
                    src={msg.fotoPerfil} 
                    alt={msg.usuario}
                    className="avatar"
                  />
                )}
                
                <div className="mensagem-conteudo">
                  {msg.uid !== user.uid && (
                    <div className="mensagem-header">
                      <strong className="usuario">{msg.usuario}</strong>
                      <span className="hora">{formatarHora(msg.timestamp)}</span>
                    </div>
                  )}
                  <div className="mensagem-texto">
                    {msg.mensagem}
                  </div>
                  {msg.uid === user.uid && (
                    <span className="hora-propria">{formatarHora(msg.timestamp)}</span>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Formulário */}
        <form className="chat-form glass" onSubmit={handleEnviar}>
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            disabled={enviando}
            maxLength="500"
          />
          <button 
            type="submit"
            disabled={enviando || !novaMensagem.trim()}
            title="Enviar"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
