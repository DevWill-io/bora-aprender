// Dashboard.jsx - Página principal com estatísticas
import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContext'
import './Dashboard.css'

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    xp: 0,
    nivel: 1,
    simuladosCompletos: 0,
    exerciciosFeitos: 0,
    tempoEstudo: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const loadStats = async () => {
      try {
        // Carregar estatísticas do Firestore
        const statsRef = collection(db, 'users', user.uid, 'stats')
        const snapshot = await getDocs(statsRef)
        
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data()
          setStats(data)
        } else {
          // Inicializar com valores padrão
          setStats({
            xp: 0,
            nivel: 1,
            simuladosCompletos: 0,
            exerciciosFeitos: 0,
            tempoEstudo: 0
          })
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [user])

  const calcularNivel = (xp) => Math.floor(xp / 1000) + 1
  const xpParaProximo = ((calcularNivel(stats.xp) - 1) * 1000 + 1000) - stats.xp

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bem-vindo de volta, {user?.displayName?.split(' ')[0]}! 👋</h1>
        <p className="subtitle">Acompanhe seu progresso e continue aprendendo</p>
      </div>

      {loading ? (
        <div className="loading">Carregando estatísticas...</div>
      ) : (
        <div className="dashboard-grid">
          {/* Card XP e Nível */}
          <div className="card glass">
            <div className="card-header">
              <h3>🎮 Experiência (XP)</h3>
              <span className="badge">Nível {calcularNivel(stats.xp)}</span>
            </div>
            <div className="xp-info">
              <div className="xp-value">{stats.xp} XP</div>
              <div className="xp-bar">
                <div 
                  className="xp-progress"
                  style={{
                    width: `${((stats.xp % 1000) / 1000) * 100}%`
                  }}
                ></div>
              </div>
              <div className="xp-meta">
                {xpParaProximo} XP para o próximo nível
              </div>
            </div>
          </div>

          {/* Card Simulados */}
          <div className="card glass">
            <div className="card-header">
              <h3>📝 Simulados</h3>
            </div>
            <div className="stat-value">{stats.simuladosCompletos}</div>
            <p className="stat-label">Simulados Concluídos</p>
          </div>

          {/* Card Exercícios */}
          <div className="card glass">
            <div className="card-header">
              <h3>✏️ Exercícios</h3>
            </div>
            <div className="stat-value">{stats.exerciciosFeitos}</div>
            <p className="stat-label">Exercícios Resolvidos</p>
          </div>

          {/* Card Tempo de Estudo */}
          <div className="card glass">
            <div className="card-header">
              <h3>⏱️ Tempo de Estudo</h3>
            </div>
            <div className="stat-value">{Math.round(stats.tempoEstudo / 60)}h</div>
            <p className="stat-label">Horas Estudadas</p>
          </div>
        </div>
      )}

      {/* Seção de Atividades Recentes */}
      <div className="recent-section">
        <h2>📊 Seu Progresso</h2>
        <div className="progress-info glass">
          <p>Você está no nível <strong>{calcularNivel(stats.xp)}</strong> com <strong>{stats.xp}</strong> XP.</p>
          <p>Continue resolvendo exercícios e fazendo simulados para ganhar mais XP!</p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="quick-access">
        <h2>🚀 Comece Agora</h2>
        <div className="quick-access-grid">
          <a href="/exercicios" className="quick-link glass">
            <span className="quick-icon">✏️</span>
            <span className="quick-text">Fazer Exercícios</span>
          </a>
          <a href="/simulados" className="quick-link glass">
            <span className="quick-icon">📝</span>
            <span className="quick-text">Fazer Simulado</span>
          </a>
          <a href="/aulas" className="quick-link glass">
            <span className="quick-icon">🎥</span>
            <span className="quick-text">Ver Aulas</span>
          </a>
          <a href="/tutor-ia" className="quick-link glass">
            <span className="quick-icon">🤖</span>
            <span className="quick-text">Tutor IA</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
