// AuthContext.jsx - Gerencia autenticação com Google e estado do usuário
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'

// Criar contexto
const AuthContext = createContext()

// Provider de autenticação
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Configurar persistência e verificar usuário já logado
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Observar mudanças de autenticação
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            })
          } else {
            setUser(null)
          }
          setLoading(false)
        })

        return unsubscribe
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Login com Google
  const loginWithGoogle = async () => {
    try {
      setError(null)
      const provider = new GoogleAuthProvider()
      
      // Configurar permissões
      provider.addScope('profile')
      provider.addScope('email')
      
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Logout
  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
      setUser(null)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
