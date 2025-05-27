const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createLostItem,
  searchLostItems
} = require("../controllers/lostItemController");

// Create a lost item (POST)
router.post("/", authMiddleware, createLostItem);

// Search lost items (GET)
router.get("/search", searchLostItems);

module.exports = router;
