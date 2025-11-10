import React, { useContext, useEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { ExpenseContext } from '../context/ExpenseContext'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { total } = useContext(ExpenseContext)
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()

  useEffect(() => {
    if (!user) {
      nav('/login')
    }
  }, [user, nav])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Dashboard</h2>
        {user && (
          <div>
            <small>{user.name}</small>
            <button onClick={logout} style={{ marginLeft: '10px' }}>
              Logout
            </button>
          </div>
        )}
      </div>

      <ExpenseForm />
      <div className="card">
        <h3>Total Spent: ₹{total}</h3>
      </div>
      <ExpenseList />
    </div>
  )
}
