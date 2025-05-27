const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  locationFound: { type: String, required: true },
  dateFound: { type: Date, required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateReported: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FoundItem", foundItemSchema);
