import { useState } from "react";
import AddTransaction from "./AddTransaction";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <AddTransaction onAdd={addTransaction} />
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.text} - ${transaction.amount} ({transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
