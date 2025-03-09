import axios from "axios";
import { useState } from "react";

const AddTransaction = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    // Create a new transaction object
    const newTransaction = {
      text,
      amount: Number(amount),
      type,
      paymentMethod,
    };
    console.log("Sending transaction:", newTransaction); // ✅ Debugging log
    try {
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        newTransaction
      );
      console.log("Response:", response.data); // ✅ Debugging log
      onAdd(response.data); // Update state with the saved transaction
    } catch (error) {
      console.log("Error adding transaction: ", error);
    }
    setText("");
    setAmount("");
    setType("expense"); // Reset the form
    setPaymentMethod("Cash");
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
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
