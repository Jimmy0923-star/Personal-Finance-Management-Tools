// 初始化交易資料
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let currentPage = 1;
const itemsPerPage = 5;

// 更新 LocalStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 渲染交易列表
function renderTransactions(order = 'asc') {
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (order === 'desc') transactions.reverse();

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = transactions.slice(start, end);

  const tbody = document.getElementById('transaction-table-body');
  tbody.innerHTML = '';
  pageData.forEach(transaction => {
    const row = `
      <tr>
        <td>${transaction.date}</td>
        <td>${transaction.type === 'income' ? '+' : '-'}${transaction.amount}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description}</td>
        <td>
          <button onclick="editTransaction(${transaction.id})">編輯</button>
          <button onclick="deleteTransaction(${transaction.id})">刪除</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  renderPagination();
  calculateTotals(); // 更新總額
}

// 新增/更新交易
document.getElementById('add-transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const date = document.getElementById('date').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  const newTransaction = { id: Date.now(), type, date, amount, category, description };

  if (isEditing) {
    const index = transactions.findIndex(txn => txn.id === editingId);
    transactions[index] = newTransaction;
    isEditing = false;
  } else {
    transactions.push(newTransaction);
  }

  updateLocalStorage();
  renderTransactions();
  updateChart();
  e.target.reset();
});

// 計算總收入、總支出與淨額
function calculateTotals() {
  const totalIncome = transactions
    .filter(txn => txn.type === 'income')
    .reduce((sum, txn) => sum + txn.amount, 0);
  const totalExpense = transactions
    .filter(txn => txn.type === 'expense')
    .reduce((sum, txn) => sum + txn.amount, 0);
  const netAmount = totalIncome - totalExpense;

  document.getElementById('total-income').textContent = totalIncome.toFixed(2);
  document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
  document.getElementById('net-amount').textContent = netAmount.toFixed(2);
}

// 繪製圓餅圖
function updateChart() {
  const incomeData = transactions.filter(txn => txn.type === 'income');
  const expenseData = transactions.filter(txn => txn.type === 'expense');

  drawPieChart(incomeData, 'income-chart');
  drawPieChart(expenseData, 'expense-chart');
}

function drawPieChart(data, chartId) {
  const canvas = document.getElementById(chartId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  if (total === 0) {
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('無數據', canvas.width / 2, canvas.height / 2);
    return;
  }

  let startAngle = 0;
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  const categories = [...new Set(data.map(item => item.category))];

  const categoryTotals = categories.map(category => ({
    category,
    total: data.filter(item => item.category === category).reduce((sum, item) => sum + item.amount, 0),
  }));

  categoryTotals.forEach((item, index) => {
    const sliceAngle = (item.total / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2) - 20, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();

    const middleAngle = startAngle + sliceAngle / 2;
    const textX = canvas.width / 2 + Math.cos(middleAngle) * (canvas.width / 2 - 40);
    const textY = canvas.height / 2 + Math.sin(middleAngle) * (canvas.height / 2 - 40);
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${item.category} (${((item.total / total) * 100).toFixed(1)}%)`, textX, textY);

    startAngle += sliceAngle;
  });
}

// 初始化頁面
document.addEventListener('DOMContentLoaded', () => {
  renderTransactions();
  updateChart();
});
