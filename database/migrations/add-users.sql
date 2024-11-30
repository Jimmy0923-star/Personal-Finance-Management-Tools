-- 增加 users 表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- 唯一 ID
    username VARCHAR(50) NOT NULL UNIQUE,       -- 使用者名稱
    password VARCHAR(255) NOT NULL,             -- 加密密碼
    email VARCHAR(100) UNIQUE,                  -- 電子郵件
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 建立時間
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 更新時間
);
