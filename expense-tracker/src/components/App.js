import React, { useState } from "react";
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import SearchBar from './SearchBar';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    const updated = expenses.filter(exp => exp.id !== id);
    setExpenses(updated);
  };

  const filteredExpenses = expenses.filter(
    exp =>
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortField === 'description') {
      return a.description.localeCompare(b.description);
    } else if (sortField === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Expense Tracker</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExpenseForm addExpense={addExpense} />
      <select onChange={(e) => setSortField(e.target.value)} style={{ marginBottom: '10px' }}>
        <option value="">-- Sort By --</option>
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>
      <ExpenseTable expenses={sortedExpenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;