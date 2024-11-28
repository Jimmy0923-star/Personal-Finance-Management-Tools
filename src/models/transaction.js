const db = require('../database/db');

// 取得所有交易
const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM transactions');
    return rows;
};

// 新增交易
const add = async (transaction) => {
    const { title, amount, type } = transaction;
    const [result] = await db.query(
        'INSERT INTO transactions (title, amount, type) VALUES (?, ?, ?)',
        [title, amount, type]
    );
    return { id: result.insertId, ...transaction };
};

// 刪除交易
const deleteTransaction = async (id) => {
    const [result] = await db.query('DELETE FROM transactions WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = { getAll, add, delete: deleteTransaction };
