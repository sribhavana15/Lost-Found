const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoundItem,
  searchFoundItems,
  getAllFoundItems
} = require("../controllers/foundItemController");

router.get("/", getAllFoundItems);
router.post("/", authMiddleware, createFoundItem);
router.get("/search", searchFoundItems);

module.exports = router;
