// App.jsx - Componente principal com rotas da aplicação
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Páginas
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Simulados from './pages/Simulados'
import Aulas from './pages/Aulas'
import Exercicios from './pages/Exercicios'
import Chat from './pages/Chat'
import TutorIA from './pages/TutorIA'

// Componentes
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'

// Estilos
import './styles/globals.css'

function App() {
  const { user, loading, isAuthenticated } = useAuth()
  const [theme, setTheme] = useState(() => {
    // Tentar obter tema salvo do localStorage
    const savedTheme = localStorage.getItem('boraaprender-theme')
    return savedTheme || 'light'
  })

  // Aplicar tema ao documento
  useEffect(() => {
    const html = document.documentElement
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark')
    } else {
      html.removeAttribute('data-theme')
    }
    localStorage.setItem('boraaprender-theme', theme)
  }, [theme])

  // Função para trocar tema
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - Login */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />

        {/* Rotas privadas - Com Layout */}
        {isAuthenticated ? (
          <Route 
            element={<Layout theme={theme} toggleTheme={toggleTheme} user={user} />}
          >
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/simulados" element={<Simulados />} />
            <Route path="/aulas" element={<Aulas />} />
            <Route path="/exercicios" element={<Exercicios />} />
            <Route path="/chat" element={<Chat user={user} />} />
            <Route path="/tutor-ia" element={<TutorIA user={user} />} />
          </Route>
        ) : null}

        {/* Rota padrão */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

        {/* Rota 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
