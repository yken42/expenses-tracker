import express from 'express';
import { createExpense, deleteExpense, getAllExpenses, updateExpense } from '../controllers/expensesController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/user/:id', getAllExpenses);
router.post('/create', verifyToken, createExpense);
router.delete('/delete/:id', deleteExpense);
router.put('/update/:id', verifyToken, updateExpense);

export default router;

