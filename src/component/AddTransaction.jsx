import { useState } from "react";

const AddTransaction = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    // Create a new transaction object
    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      type,
    };

    onAdd(newTransaction); // Pass new transaction to parent component
    setText("");
    setAmount("");
    setType("expense"); // Reset the form
  };

  return (
    <div>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
