// Aulas.jsx - Página com playlists de vídeos
import React, { useState } from 'react'
import './Aulas.css'

function Aulas() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('matemática')

  // Simulação de playlists (em produção, consumiria YouTube Data API)
  const playlists = {
    matemática: [
      { id: 1, titulo: 'Álgebra Básica', videos: 15, url: '#' },
      { id: 2, titulo: 'Geometria', videos: 12, url: '#' },
      { id: 3, titulo: 'Trigonometria', videos: 18, url: '#' },
      { id: 4, titulo: 'Cálculo', videos: 20, url: '#' }
    ],
    programação: [
      { id: 5, titulo: 'JavaScript Completo', videos: 50, url: '#' },
      { id: 6, titulo: 'React do Zero', videos: 40, url: '#' },
      { id: 7, titulo: 'Backend com Node.js', videos: 35, url: '#' }
    ],
    história: [
      { id: 8, titulo: 'História do Brasil', videos: 25, url: '#' },
      { id: 9, titulo: 'História Geral', videos: 30, url: '#' },
      { id: 10, titulo: 'História Moderna', videos: 22, url: '#' }
    ],
    inglês: [
      { id: 11, titulo: 'Inglês para Iniciantes', videos: 35, url: '#' },
      { id: 12, titulo: 'Gramática Avançada', videos: 28, url: '#' },
      { id: 13, titulo: 'Conversação', videos: 30, url: '#' }
    ]
  }

  const categorias = Object.keys(playlists)

  return (
    <div className="aulas">
      <div className="aulas-header">
        <h1>🎥 Videoaulas</h1>
        <p>Aprenda com nossas playlists de vídeos categorizadas</p>
      </div>

      {/* Filtro de Categorias */}
      <div className="categorias-filter">
        {categorias.map(categoria => (
          <button
            key={categoria}
            className={`categoria-btn ${categoriaSelecionada === categoria ? 'ativa' : ''}`}
            onClick={() => setCategoriaSelecionada(categoria)}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </button>
        ))}
      </div>

      {/* Playlists */}
      <div className="playlists-grid">
        {playlists[categoriaSelecionada]?.map(playlist => (
          <div key={playlist.id} className="playlist-card card">
            <div className="playlist-thumb">
              <span className="thumb-icon">▶️</span>
              <span className="video-count">{playlist.videos} vídeos</span>
            </div>

            <div className="playlist-info">
              <h3>{playlist.titulo}</h3>
              <p className="playlist-description">
                Aprenda {playlist.titulo.toLowerCase()} com aulas práticas e objetivas
              </p>

              <button className="btn-playlist">
                Assistir Playlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="aulas-info glass">
        <h3>💡 Dica</h3>
        <p>
          As videoaulas são integradas com a YouTube Data API. 
          Configure suas credenciais do YouTube no arquivo .env para carregar suas playlists preferidas.
        </p>
      </div>
    </div>
  )
}

export default Aulas
