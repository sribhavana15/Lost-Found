const FoundItem = require("../models/FoundItem");
const LostItem = require("../models/LostItem");
const Match = require("../models/Match");

exports.createFoundItem = async (req, res) => {
  try {
    const { name, model, color, locationFound, dateFound } = req.body;

    if (!name || !model || !color || !locationFound || !dateFound) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const foundItem = await FoundItem.create({
      name,
      model,
      color,
      locationFound,
      dateFound,
      reportedBy: req.user.id,
      dateReported: new Date()
    });

    const matchedLost = await LostItem.findOne({
      name,
      model,
      color,
      locationLost: locationFound
    });

    if (matchedLost) {
      await Match.create({
        lostItem: matchedLost._id,
        foundItem: foundItem._id,
        status: "pending"
      });
    }

    res.status(201).json({ message: "Found item reported", foundItem });
  } catch (error) {
    console.error("Found item error:", error.message || error);
    res.status(500).json({ error: "Failed to save found item" });
  }
};

exports.searchFoundItems = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    const items = await FoundItem.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { color: { $regex: query, $options: "i" } },
        { locationFound: { $regex: query, $options: "i" } }
      ]
    });

    res.status(200).json(items);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};
