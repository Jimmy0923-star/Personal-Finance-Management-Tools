document.addEventListener("DOMContentLoaded", () => {
    // 初始化交易數據
    const transactions = [];

    // DOM 元素
    const addTransactionForm = document.querySelector('#add-transaction-form');
    const transactionType = document.querySelector('#transaction-type');
    const transactionDescription = document.querySelector('#transaction-description');
    const transactionAmount = document.querySelector('#transaction-amount');
    const transactionList = document.querySelector('#transaction-list');
    const incomeDisplay = document.querySelector('#income-display');
    const expenseDisplay = document.querySelector('#expense-display');
    const balanceDisplay = document.querySelector('#balance-display');

    // 新增交易
    addTransactionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = transactionType.value;
        const description = transactionDescription.value.trim();
        const amount = parseFloat(transactionAmount.value);

        if (!description || isNaN(amount) || amount <= 0) {
            alert("請輸入有效的描述和金額！");
            return;
        }

        const transaction = {
            id: Date.now(),
            type,
            description,
            amount
        };

        transactions.push(transaction);

        renderTransactions();
        updateSummary();

        addTransactionForm.reset();
    });

    // 渲染交易清單
    function renderTransactions() {
        transactionList.innerHTML = '';

        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.className = transaction.type === 'income' ? 'income-item' : 'expense-item';
            listItem.innerHTML = `
                <span>${transaction.description}</span>
                <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">刪除</button>
            `;
            transactionList.appendChild(listItem);
        });
    }

    // 更新收入、支出和餘額
    function updateSummary() {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        incomeDisplay.textContent = `$${income.toFixed(2)}`;
        expenseDisplay.textContent = `$${expense.toFixed(2)}`;
        balanceDisplay.textContent = `$${(income - expense).toFixed(2)}`;
    }

    // 刪除交易
    window.deleteTransaction = function (id) {
        const index = transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            transactions.splice(index, 1);
            renderTransactions();
            updateSummary();
        }
    };
});
