// DOM 元素選取
const addTransactionForm = document.querySelector('#add-transaction-form');
const transactionType = document.querySelector('#transaction-type');
const transactionDescription = document.querySelector('#transaction-description');
const transactionAmount = document.querySelector('#transaction-amount');
const transactionList = document.querySelector('#transaction-list');
const incomeDisplay = document.querySelector('#income-display');
const expenseDisplay = document.querySelector('#expense-display');
const balanceDisplay = document.querySelector('#balance-display');
const canvas = document.getElementById('dynamic-background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onload = function () {
    const canvas = document.getElementById('dynamic-background');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 簡化的動畫星星背景測試
    const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
    }));

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();
};



// 數據存儲
let transactions = [];

// 初始化應用
function init() {
    // 讀取現有數據並渲染
    renderTransactions();
    updateSummary();
}

// 新增交易項目
function addTransaction(e) {
    e.preventDefault();

    const type = transactionType.value; // 收入 or 支出
    const description = transactionDescription.value.trim();
    const amount = parseFloat(transactionAmount.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('請輸入有效的描述和金額！');
        return;
    }

    // 建立交易物件
    const transaction = {
        id: Date.now(), // 唯一ID
        type: type,
        description: description,
        amount: amount
    };

    // 加入交易清單
    transactions.push(transaction);

    // 更新頁面
    renderTransactions();
    updateSummary();

    // 重置表單
    addTransactionForm.reset();
}

// 渲染交易列表
function renderTransactions() {
    transactionList.innerHTML = ''; // 清空列表

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add(transaction.type === 'income' ? 'income-item' : 'expense-item');

        listItem.innerHTML = `
            ${transaction.description} 
            <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">刪除</button>
        `;

        transactionList.appendChild(listItem);
    });
}

// 更新摘要（收入、支出、餘額）
function updateSummary() {
    const income = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = income - expense;

    // 更新 DOM
    incomeDisplay.textContent = `$${income.toFixed(2)}`;
    expenseDisplay.textContent = `$${expense.toFixed(2)}`;
    balanceDisplay.textContent = `$${balance.toFixed(2)}`;
}

// 刪除交易
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    // 更新頁面
    renderTransactions();
    updateSummary();
}

// 事件監聽
addTransactionForm.addEventListener('submit', addTransaction);

// 初始化應用
init();
