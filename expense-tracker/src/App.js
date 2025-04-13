import React, { useState } from "react";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseForm from "./components/ExpenseForm";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
  };

  const filteredExpenses = expenses.filter(
    (e) =>
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <ExpenseForm onAdd={addExpense} />
      <ExpenseTable
        expenses={filteredExpenses}
        onDelete={deleteExpense}
      />
    </div>
  );
}
