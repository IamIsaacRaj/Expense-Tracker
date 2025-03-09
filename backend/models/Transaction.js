const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Card", "Bank Transfer"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
