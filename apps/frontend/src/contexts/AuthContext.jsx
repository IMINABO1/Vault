import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('vault_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('vault_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    // In a real app, this would call your backend API
    // For now, we'll simulate login with localStorage
    const storedUsers = JSON.parse(localStorage.getItem('vault_users') || '[]')
    const foundUser = storedUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData = { ...foundUser }
      delete userData.password // Don't store password in user state
      setUser(userData)
      localStorage.setItem('vault_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const signup = (name, email, phone, password) => {
    // In a real app, this would call your backend API
    const storedUsers = JSON.parse(localStorage.getItem('vault_users') || '[]')
    
    // Check if user already exists
    if (storedUsers.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' }
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    }

    // Store user with password (in real app, password would be hashed on backend)
    storedUsers.push({ ...newUser, password })
    localStorage.setItem('vault_users', JSON.stringify(storedUsers))

    // Set user as logged in
    setUser(newUser)
    localStorage.setItem('vault_user', JSON.stringify(newUser))
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vault_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
