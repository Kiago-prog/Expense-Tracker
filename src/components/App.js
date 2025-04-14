import React, { useState } from "react";
import styles from '../App.module.css';
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
    <div className={styles.container}>
      <h1 className={styles.heading}>Expense Tracker</h1>

      <div className={styles.section}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className={styles.section}>
        <ExpenseForm addExpense={addExpense} />
      </div>

      <div className={styles.section}>
        <select 
          onChange={(e) => setSortField(e.target.value)} 
          className={styles.select}
        >
          <option value="">-- Sort By --</option>
          <option value="name">Name</option>
          <option value="description">Description</option>
        </select>
      </div>

      <ExpenseTable expenses={sortedExpenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;
