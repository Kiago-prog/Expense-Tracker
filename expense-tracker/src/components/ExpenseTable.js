import React, { useState } from "react";

export default function ExpenseTable({ expenses, onDelete }) {
  const [sortBy, setSortBy] = useState(null);

  const sorted = [...expenses].sort((a, b) => {
    if (!sortBy) return 0;
    return a[sortBy].localeCompare(b[sortBy]);
  });

  return (
    <div>
      <div>
        <button onClick={() => setSortBy("description")}>Sort by Description</button>
        <button onClick={() => setSortBy("category")}>Sort by Category</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((e, i) => (
            <tr key={i}>
              <td>{e.description}</td>
              <td>${e.amount}</td>
              <td>{e.category}</td>
              <td><button onClick={() => onDelete(i)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
