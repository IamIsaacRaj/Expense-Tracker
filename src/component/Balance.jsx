import React from 'react'

const Balance = ({ transactions }) => {
  const totalBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);


  return (
    <div>
      <h3>💰 Total Balance: ₹{totalBalance.toFixed(2)}</h3>
      <p>📈 Income: ₹{totalIncome.toFixed(2)}</p>
      <p>📉 Expense: ₹{totalExpense.toFixed(2)}</p>
    </div>
  );
};

export default Balance