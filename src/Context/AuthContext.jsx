import { createContext, useEffect, useState } from 'react'
import { API_BASE_URL } from '../api'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const validateSession = async () => {
      const savedToken = localStorage.getItem('token')

      if (!savedToken) {
        setCurrentUser(null)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        })

        if (!response.ok) {
          throw new Error('Session invalid')
        }

        const data = await response.json()
        const user = data.user || null

        if (!user) {
          throw new Error('Profile missing')
        }

        setCurrentUser(user)
        setToken(savedToken)
        localStorage.setItem('currentUser', JSON.stringify(user))
      } catch (error) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        setCurrentUser(null)
        setToken(null)
      } finally {
        setLoading(false)
      }
    }

    validateSession()
  }, [])

  const login = (user, jwtToken) => {
    const normalizedToken = jwtToken || token
    setCurrentUser(user)
    setToken(normalizedToken)

    localStorage.setItem('currentUser', JSON.stringify(user))
    if (normalizedToken) {
      localStorage.setItem('token', normalizedToken)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setToken(null)

    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider