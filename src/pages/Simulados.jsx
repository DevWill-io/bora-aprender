// Simulados.jsx - Página de simulados cronometrados
import React, { useState } from 'react'
import './Simulados.css'

function Simulados() {
  const [simuladoAtivo, setSimuladoAtivo] = useState(null)

  const simulados = [
    {
      id: 1,
      titulo: 'Simulado Completo - Matemática',
      descricao: 'Teste seus conhecimentos em matemática com 20 questões variadas',
      duracao: 60,
      questoes: 20,
      dificuldade: 'Misto'
    },
    {
      id: 2,
      titulo: 'Simulado Rápido - Programação',
      descricao: '10 questões sobre programação e desenvolvimento web',
      duracao: 30,
      questoes: 10,
      dificuldade: 'Médio'
    },
    {
      id: 3,
      titulo: 'Simulado Avançado - Lógica',
      descricao: 'Desafie-se com questões avançadas de lógica',
      duracao: 45,
      questoes: 15,
      dificuldade: 'Difícil'
    },
    {
      id: 4,
      titulo: 'Simulado ENEM Style',
      descricao: 'Simulado no estilo ENEM com múltiplas disciplinas',
      duracao: 180,
      questoes: 90,
      dificuldade: 'Misto'
    }
  ]

  return (
    <div className="simulados">
      <div className="simulados-header">
        <h1>📝 Simulados Cronometrados</h1>
        <p>Teste seus conhecimentos com provas realistas</p>
      </div>

      {simuladoAtivo ? (
        <div className="simulado-em-andamento glass">
          <h2>Simulado em Construção</h2>
          <p>Esta funcionalidade será desenvolvida em breve.</p>
          <p>Você selecionou: <strong>{simuladoAtivo.titulo}</strong></p>
          <button 
            className="btn-voltar"
            onClick={() => setSimuladoAtivo(null)}
          >
            Voltar
          </button>
        </div>
      ) : (
        <div className="simulados-grid">
          {simulados.map(simulado => (
            <div key={simulado.id} className="simulado-card card">
              <div className="simulado-header">
                <h3>{simulado.titulo}</h3>
              </div>
              
              <p className="simulado-descricao">{simulado.descricao}</p>

              <div className="simulado-info">
                <div className="info-item">
                  <span className="info-label">⏱️</span>
                  <span>{simulado.duracao} min</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📄</span>
                  <span>{simulado.questoes} questões</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📊</span>
                  <span>{simulado.dificuldade}</span>
                </div>
              </div>

              <button 
                className="btn-iniciar"
                onClick={() => setSimuladoAtivo(simulado)}
              >
                Iniciar Simulado
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Simulados
