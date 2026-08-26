import { createContext, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  const login = (user) => {
    setCurrentUser(user)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider