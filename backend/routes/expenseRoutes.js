const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController');

router.route('/').get(protect, getExpenses).post(protect, createExpense);
router.route('/:id').delete(protect, deleteExpense).put(protect, updateExpense);

module.exports = router;
