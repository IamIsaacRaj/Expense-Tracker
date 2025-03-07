import { useState } from "react";
import AddTransaction from "./AddTransaction";
import Balance from "./Balance";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest")

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Filter transactions (All, Income, Expense)
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  // Sort transactions (Latest, High to Low, Low to High)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === "latest") return b.id - a.id; // Newest first
    if (sortOrder === "high-low") return b.amount - a.amount; // High to Low
    if (sortOrder === "low-high") return a.amount - b.amount; // Low to High
    return 0;
  });

  return (
    <div>
      <h2>Expense Tracker</h2>
      <Balance transactions={transactions} />
      <AddTransaction onAdd={addTransaction} />

      {/* Filter Section */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {/* Filter by type */}
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Transactions</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* sort by Amount */}
      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="high-low">High - low</option>
        <option value="low-high">Low - High</option>
      </select>
      </div>

      {/* Transaction List */}
      <ul>
        {sortedTransactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.text} - ${transaction.amount} ({transaction.type})
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
