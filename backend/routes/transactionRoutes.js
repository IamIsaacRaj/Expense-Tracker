const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

/**
 * @route           GET /api/transactions
 * @description     Get all transactions
 * @access          Public
 */

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @route           POST /api/transactions
 * @description     Create a new Transaction
 * @access          Public
 */

router.post("/", async (req, res) => {
  try {
    const { text, amount, type } = req.body;
    const transaction = new Transaction({ text, amount, type });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

/**
 * @route           DELETE /api/transactions/:id
 * @description     Delete a transaction by ID
 * @access          Public
 */

router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
