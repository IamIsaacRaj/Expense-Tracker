import { useState, useEffect } from "react";
import axios from "axios";
import AddTransaction from "./AddTransaction";
import Balance from "./Balance";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

  // Fetch transactions from Backend on Component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error Fetching Transactions: ", error));
  }, []);

  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  // Filter transactions (All, Income, Expense)
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  // Sort transactions (Latest, High to Low, Low to High)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === "latest")
      // Newest first
      return new Date(b.createdAt) - new Date(a.createdAt);
    // High to Low
    if (sortOrder === "high-low") return b.amount - a.amount;
    // Low to High
    if (sortOrder === "low-high") return a.amount - b.amount;
    return 0;
  });

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction._id !== id)
      );
    } catch (error) {
      console.error("error deleting transaction: ", error);
    }
  };

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
          <li key={transaction._id}>
            {new Date(transaction.createdAt).toLocaleDateString("en-IN")}{" "}
            {transaction.text} : {transaction.type === "income" ? "+" : "-"} ₹
            {Math.abs(transaction.amount).toLocaleString("en-IN")} (
            {transaction.type})
            <button onClick={() => deleteTransaction(transaction._id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
