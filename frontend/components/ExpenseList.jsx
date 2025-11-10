import React, { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'

export default function ExpenseList() {
  const { expenses, removeExpense } = useContext(ExpenseContext)

  return (
    <div className="card">
      <h3>Expenses</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {expenses.map((exp) => (
          <li
            key={exp._id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #eee',
              padding: '8px 0'
            }}
          >
            <div>
              <strong>{exp.title}</strong>
              <br />
              <small>{exp.category}</small>
            </div>
            <div>
              ₹{exp.amount}
              <button
                style={{ marginLeft: '10px', background: '#dc3545' }}
                onClick={() => removeExpense(exp._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
