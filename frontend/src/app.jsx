import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import { AuthProvider } from "../context/AuthContext";
import { ExpenseProvider } from "../context/ExpenseContext";

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <header className="header">
          <Link to="/">💰 Expense Tracker</Link>
          <nav>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </ExpenseProvider>
    </AuthProvider>
  )
}
