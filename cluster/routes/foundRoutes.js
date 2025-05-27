const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoundItem,
  searchFoundItems
} = require("../controllers/foundItemController");

router.post("/", authMiddleware, createFoundItem);
router.get("/search", searchFoundItems);

module.exports = router;
