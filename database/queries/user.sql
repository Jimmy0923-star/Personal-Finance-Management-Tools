-- queries/user.sql
-- 插入新使用者
INSERT INTO users (username, password, email) 
VALUES (?, ?, ?);

-- 查詢所有使用者
SELECT * FROM users;

-- 根據ID查詢使用者
SELECT * FROM users WHERE id = ?;
