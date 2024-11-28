const express = require('express');
const router = express.Router();
const { getAllTransactions, addTransaction, deleteTransaction } = require('../controllers/transaction');

// 取得所有交易
router.get('/transactions', getAllTransactions);

// 新增交易
router.post('/transactions', addTransaction);

// 刪除交易
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;
