const Transaction = require('../models/transaction');

// 取得所有交易
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.getAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: '無法取得交易資料' });
    }
};

// 新增交易
const addTransaction = async (req, res) => {
    try {
        const { title, amount, type } = req.body;
        const newTransaction = await Transaction.add({ title, amount, type });
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: '新增交易失敗' });
    }
};

// 刪除交易
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Transaction.delete(id);
        if (result) {
            res.status(200).json({ message: '交易已刪除' });
        } else {
            res.status(404).json({ error: '找不到交易' });
        }
    } catch (error) {
        res.status(500).json({ error: '刪除交易失敗' });
    }
};

module.exports = { getAllTransactions, addTransaction, deleteTransaction };
