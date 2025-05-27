const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  locationLost: { type: String, required: true },
  dateLost: { type: Date, required: true }, //  This must match exactly
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateReported: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LostItem", lostItemSchema);
