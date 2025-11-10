import React, { createContext, useState, useEffect } from 'react'
import api, { setAuthToken } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user && user.token) setAuthToken(user.token)
    else setAuthToken(null)
  }, [user])

  const signup = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload)
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
