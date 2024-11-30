-- queries/transaction.sql
-- 插入交易
INSERT INTO transactions (user_id, amount, type) 
VALUES (?, ?, ?);

-- 查詢使用者的所有交易
SELECT * FROM transactions WHERE user_id = ?;

-- 計算使用者的總收入和支出
SELECT 
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
FROM transactions WHERE user_id = ?;
