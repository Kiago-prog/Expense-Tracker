const form = document.getElementById('expense-form');
const tableBody = document.querySelector('#expense-table tbody');
const searchInput = document.getElementById('search');

let expenses = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  console.log({ description, amount, category });  // Check the input data

  const expense = { description, amount, category };
  expenses.push(expense);
  console.log(expenses);  // Log the array to see if it's being updated

  displayExpenses(expenses);
  form.reset();
});


searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = expenses.filter(e =>
    e.description.toLowerCase().includes(term) ||
    e.category.toLowerCase().includes(term)
  );
  displayExpenses(filtered);
});

function displayExpenses(data) {
  tableBody.innerHTML = '';
  data.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>$${parseFloat(expense.amount).toFixed(2)}</td>
      <td>${expense.category}</td>
      <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses(expenses);
}

function sortTable(columnIndex) {
  const key = ['description', 'amount', 'category'][columnIndex];
  const sorted = [...expenses].sort((a, b) => {
    if (key === 'amount') {
      return parseFloat(a[key]) - parseFloat(b[key]);
    }
    return a[key].localeCompare(b[key]);
  });
  displayExpenses(sorted);
}
