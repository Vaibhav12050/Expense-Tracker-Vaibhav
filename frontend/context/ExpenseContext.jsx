import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'
import { AuthContext } from './AuthContext'

export const ExpenseContext = createContext()

export const ExpenseProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchExpenses = async () => {
    if (!user) return setExpenses([])
    setLoading(true)
    try {
      const { data } = await api.get('/expenses')
      setExpenses(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [user])

  const addExpense = async (payload) => {
    const { data } = await api.post('/expenses', payload)
    setExpenses((prev) => [data, ...prev])
  }

  const removeExpense = async (id) => {
    await api.delete(`/expenses/${id}`)
    setExpenses((prev) => prev.filter((e) => e._id !== id))
  }

  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)

  return (
    <ExpenseContext.Provider
      value={{ expenses, loading, fetchExpenses, addExpense, removeExpense, total }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
