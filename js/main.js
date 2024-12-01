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
    function addTransaction(e) {
    e.preventDefault();

    const type = transactionType.value;
    const description = transactionDescription.value.trim();
    const amount = parseFloat(transactionAmount.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('請輸入有效的描述和金額！');
        return;
    }

    const transaction = {
        id: Date.now(),
        type,
        description,
        amount
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions)); // 儲存至 LocalStorage

    renderTransactions();
    updateSummary();
    addTransactionForm.reset();
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


document.addEventListener('DOMContentLoaded', () => {
    let goalAmount = 0; // 儲蓄目標金額
    let currentSavings = 0; // 已儲蓄金額

    const goalForm = document.getElementById('savings-form');
    const goalDisplay = document.getElementById('goal-display');
    const currentSavingsDisplay = document.getElementById('current-savings');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress');
    const addSavingsForm = document.getElementById('add-savings-form');

    // 設定儲蓄目標
    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        goalAmount = parseFloat(document.getElementById('goal-amount').value);
        if (goalAmount > 0) {
            goalDisplay.textContent = `$${goalAmount.toFixed(2)}`;
            progressContainer.classList.remove('hidden'); // 顯示進度條
            updateProgress();
        }
    });

    // 新增儲蓄金額
    addSavingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const savingsAmount = parseFloat(document.getElementById('savings-amount').value);
        if (savingsAmount > 0) {
            currentSavings += savingsAmount;
            updateProgress();
        }
        document.getElementById('savings-amount').value = ''; // 清空輸入欄
    });

    // 更新進度條與金額顯示
    function updateProgress() {
        currentSavingsDisplay.textContent = `$${currentSavings.toFixed(2)}`;
        const progressPercentage = Math.min((currentSavings / goalAmount) * 100, 100); // 確保不超過 100%
        progressBar.style.width = `${progressPercentage}%`;

        // 可選：達成目標時給提示
        if (progressPercentage >= 100) {
            alert('恭喜！您已達成儲蓄目標！');
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-button");

  logoutButton.addEventListener("click", () => {
    // 清除特定 key 的 localStorage
    localStorage.removeItem('userToken'); // 假設您儲存了 userToken
    localStorage.removeItem('userData'); // 假設您儲存了 userData

    // 重新導向到登入頁面
    window.location.href = "/login"; // 調整為您的登入頁面路徑
  });
});
});


