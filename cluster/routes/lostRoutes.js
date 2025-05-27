const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createLostItem,
  searchLostItems,
  getAllLostItems
} = require("../controllers/lostItemController");

router.get("/", getAllLostItems);
router.post("/", authMiddleware, createLostItem);
router.get("/search", searchLostItems);

module.exports = router;
