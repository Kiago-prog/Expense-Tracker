const form = document.getElementById("expense-form");
const tableBody = document.querySelector("#expense-table tbody");
const searchInput = document.getElementById("search");
const sortDescription = document.getElementById("sort-description");
const sortCategory = document.getElementById("sort-category");

let expenses = [];

let currentSort = {
  key: '',
  asc: true
};

// Render expenses in the table
function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>$${parseFloat(expense.amount).toFixed(2)}</td>
      <td>${expense.category}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value.trim();
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value.trim();

  if (!description || !amount) return;

  expenses.push({ description, amount, category });
  filterExpenses(); // Update view
  form.reset();
});

// Delete an expense
tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    expenses.splice(index, 1);
    filterExpenses(); // Refresh after deletion
  }
});

// Filter expenses by search
searchInput.addEventListener("input", filterExpenses);

function filterExpenses() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = expenses.filter(exp =>
    exp.description.toLowerCase().includes(searchTerm) ||
    exp.category.toLowerCase().includes(searchTerm)
  );
  renderTable(filtered);
}

// Sort table by given key (description or category)
function sortBy(key) {
  currentSort.asc = currentSort.key === key ? !currentSort.asc : true;
  currentSort.key = key;

  expenses.sort((a, b) => {
    const aVal = a[key].toLowerCase();
    const bVal = b[key].toLowerCase();
    return currentSort.asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  filterExpenses(); // Maintain filtering after sorting
}

sortDescription.addEventListener("click", () => sortBy("description"));
sortCategory.addEventListener("click", () => sortBy("category"));
