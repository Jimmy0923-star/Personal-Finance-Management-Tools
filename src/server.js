const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 中介軟體設置
app.use(bodyParser.json());
app.use(cors());

// 路由
const transactionRoutes = require('./routes/api');
app.use('/api', transactionRoutes);

// 主頁面靜態資源
app.use(express.static('public'));

// 啟動伺服器
app.listen(PORT, () => {
    console.log(伺服器正在 http://localhost:${PORT} 運行);
});
