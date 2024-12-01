document.addEventListener('DOMContentLoaded', () => {
    const transactionList = document.querySelector('#transaction-list');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || []; // 從 LocalStorage 獲取交易資料

    function renderTransactions() {
        transactionList.innerHTML = '';

        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.className = transaction.type === 'income' ? 'income-item' : 'expense-item';
            listItem.innerHTML = `
                <span>${transaction.description}</span>
                <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
            `;
            transactionList.appendChild(listItem);
        });
    }

    renderTransactions();
});
