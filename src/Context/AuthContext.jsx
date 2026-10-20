import { createContext, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  )

  const login = (user, jwtToken) => {
    setCurrentUser(user)
    setToken(jwtToken)

    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('token', jwtToken)
  }

  const logout = () => {
    setCurrentUser(null)
    setToken(null)

    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider