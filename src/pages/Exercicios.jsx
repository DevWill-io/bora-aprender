// Exercicios.jsx - Página de listas de exercícios
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import questoesData from '../data/questoes.json'
import './Exercicios.css'

function Exercicios() {
  const { user } = useAuth()
  const [materias, setMaterias] = useState([])
  const [materiaSelecionada, setMateriaSelecionada] = useState('Matemática')
  const [dificuldade, setDificuldade] = useState('todos')
  const [questoes, setQuestoes] = useState([])
  const [respostas, setRespostas] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [resultado, setResultado] = useState(null)

  // Carregar matérias únicas
  useEffect(() => {
    const materiasUnicas = [...new Set(questoesData.questoes.map(q => q.materia))]
    setMaterias(materiasUnicas)
  }, [])

  // Filtrar questões
  useEffect(() => {
    let filtradas = questoesData.questoes.filter(q => q.materia === materiaSelecionada)
    
    if (dificuldade !== 'todos') {
      filtradas = filtradas.filter(q => q.dificuldade === dificuldade)
    }

    setQuestoes(filtradas)
    setRespostas({})
    setEnviado(false)
    setResultado(null)
  }, [materiaSelecionada, dificuldade])

  // Lidar com resposta
  const handleResposta = (questaoId, indiceResposta) => {
    if (enviado) return // Não permitir mudar após envio

    setRespostas(prev => ({
      ...prev,
      [questaoId]: indiceResposta
    }))
  }

  // Enviar respostas
  const handleEnviar = () => {
    if (Object.keys(respostas).length !== questoes.length) {
      alert('Responda todas as questões antes de enviar!')
      return
    }

    // Calcular resultado
    let acertos = 0
    questoes.forEach(questao => {
      if (respostas[questao.id] === questao.resposta_correta) {
        acertos++
      }
    })

    const percentualAcerto = Math.round((acertos / questoes.length) * 100)
    setResultado({
      acertos,
      total: questoes.length,
      percentual: percentualAcerto,
      xpGanho: Math.round((acertos / questoes.length) * 100)
    })
    setEnviado(true)
  }

  // Resetar
  const handleResetar = () => {
    setRespostas({})
    setEnviado(false)
    setResultado(null)
  }

  return (
    <div className="exercicios">
      <div className="exercicios-header">
        <h1>📚 Listas de Exercícios</h1>
        <p>Escolha uma matéria e teste seus conhecimentos</p>
      </div>

      {/* Filtros */}
      <div className="filtros glass">
        <div className="filtro-grupo">
          <label>Matéria:</label>
          <select 
            value={materiaSelecionada}
            onChange={(e) => setMateriaSelecionada(e.target.value)}
            disabled={enviado}
          >
            {materias.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Dificuldade:</label>
          <select 
            value={dificuldade}
            onChange={(e) => setDificuldade(e.target.value)}
            disabled={enviado}
          >
            <option value="todos">Todas</option>
            <option value="fácil">Fácil</option>
            <option value="médio">Médio</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>

        <div className="filtro-info">
          <span>{questoes.length} questão(ões)</span>
        </div>
      </div>

      {/* Questões */}
      <div className="questoes-container">
        {questoes.length === 0 ? (
          <div className="empty-state glass">
            <p>Nenhuma questão encontrada para esta seleção</p>
          </div>
        ) : (
          <>
            {questoes.map((questao, index) => (
              <div key={questao.id} className="questao card">
                <div className="questao-header">
                  <h3>Questão {index + 1}</h3>
                  <span className={`dificuldade dificuldade-${questao.dificuldade}`}>
                    {questao.dificuldade}
                  </span>
                </div>

                <p className="questao-texto">{questao.pergunta}</p>

                <div className="opcoes">
                  {questao.opcoes.map((opcao, indice) => (
                    <label 
                      key={indice} 
                      className={`opcao ${
                        respostas[questao.id] === indice ? 'selecionada' : ''
                      } ${
                        enviado && indice === questao.resposta_correta ? 'correta' : ''
                      } ${
                        enviado && respostas[questao.id] === indice && indice !== questao.resposta_correta ? 'incorreta' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`questao-${questao.id}`}
                        value={indice}
                        checked={respostas[questao.id] === indice}
                        onChange={() => handleResposta(questao.id, indice)}
                        disabled={enviado}
                      />
                      <span className="opcao-letter">
                        {String.fromCharCode(65 + indice)})
                      </span>
                      <span className="opcao-texto">{opcao}</span>
                    </label>
                  ))}
                </div>

                {enviado && (
                  <div className="explicacao">
                    <p><strong>Resposta correta:</strong> {questao.opcoes[questao.resposta_correta]}</p>
                    <p><strong>Explicação:</strong> {questao.explicacao}</p>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="resultado glass">
          <h2>📊 Seu Resultado</h2>
          <div className="resultado-grid">
            <div className="resultado-item">
              <div className="resultado-valor">{resultado.acertos}/{resultado.total}</div>
              <div className="resultado-label">Acertos</div>
            </div>
            <div className="resultado-item">
              <div className="resultado-valor">{resultado.percentual}%</div>
              <div className="resultado-label">Taxa de Acerto</div>
            </div>
            <div className="resultado-item">
              <div className="resultado-valor">+{resultado.xpGanho} XP</div>
              <div className="resultado-label">XP Ganho</div>
            </div>
          </div>
          <p className="resultado-feedback">
            {resultado.percentual >= 80 && '🎉 Excelente! Você domina este conteúdo!'}
            {resultado.percentual >= 60 && resultado.percentual < 80 && '👍 Bom trabalho! Continue praticando.'}
            {resultado.percentual < 60 && '📚 Continue estudando. Você está no caminho certo!'}
          </p>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="acoes-container">
        {!enviado ? (
          <button 
            className="btn-enviar"
            onClick={handleEnviar}
            disabled={Object.keys(respostas).length === 0}
          >
            Enviar Respostas
          </button>
        ) : (
          <button 
            className="btn-resetar"
            onClick={handleResetar}
          >
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  )
}

export default Exercicios
