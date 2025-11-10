import React, { useState, useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

export default function ExpenseForm() {
  const { addExpense } = useContext(ExpenseContext)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other')

  const submit = async (e) => {
    e.preventDefault()
    if (!title || !amount) return alert('Title and Amount are required')
    await addExpense({ title, amount: Number(amount), category })
    setTitle('')
    setAmount('')
    setCategory('Other')
  }

  return (
    <form className="card" onSubmit={submit}>
      <div className="form-row">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
        <button>Add</button>
      </div>
    </form>
  )
}
