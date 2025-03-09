import { useState, useEffect } from "react";
import axios from "axios";
import AddTransaction from "./AddTransaction";
import Balance from "./Balance";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [paymentMethod,setPaymentMethod] = useState("")

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
    // 1 Filter by Income/Expense
    if (filter !== "all" && transaction.type !== filter) return false;

    // 2 Filter by Date Range
    const transactionDate = new Date(transaction.createdAt)
      .toISOString()
      .split("T")[0];

    if (startDate && transactionDate < startDate) return false;
    if (endDate && transactionDate > endDate) return false;

    // 3 Filter by specific month and year
    const transactionMonth = (
      "0" +
      (new Date(transaction.createdAt).getMonth() + 1)
    ).slice(-2);
    const transactionYear = new Date(transaction.createdAt)
      .getFullYear()
      .toString();

    if (selectedMonth && transactionMonth !== selectedMonth) return false;
    if (selectedYear && transactionYear !== selectedYear) return false;

    // 4 Filter by Payment Method
    
    if (
      paymentMethod &&
      transaction.paymentMethod !== paymentMethod
    )
      return false;

    return true;
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
        {/* filter by payment method */}
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">All Payment Methods</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>From:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>To:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Transaction List */}
      <ul>
        {sortedTransactions.map((transaction) => (
          <li key={transaction._id}>
            {new Date(transaction.createdAt).toLocaleDateString("en-IN")}{" "}
            {transaction.text} : {transaction.type === "income" ? "+" : "-"} ₹
            {Math.abs(transaction.amount).toLocaleString("en-IN")} (
            {transaction.type}) {transaction.paymentMethod}
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
