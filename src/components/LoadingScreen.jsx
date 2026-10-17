// LoadingScreen.jsx - Tela de carregamento
import React from 'react'
import './LoadingScreen.css'

function LoadingScreen() {
  return (
    <div className="loading-screen glass">
      <div className="loading-container">
        <h1 className="loading-title">Bora Aprender</h1>
        <div className="spinner"></div>
        <p className="loading-text">Carregando sua jornada educacional...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
