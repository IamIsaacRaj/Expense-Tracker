require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");


const app = express();
app.use(cors());
app.use(express.json()); // Allows JSON requests

// Connect Route
app.use("/api/transactions",transactionRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API!");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
