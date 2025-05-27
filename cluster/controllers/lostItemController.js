const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const Match = require("../models/Match");

exports.createLostItem = async (req, res) => {
  try {
    const { name, model, color, locationLost, dateLost } = req.body;

    if (!name || !model || !color || !locationLost || !dateLost) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const lostItem = await LostItem.create({
      name,
      model,
      color,
      locationLost,
      dateLost,
      reportedBy: req.user.id,
      dateReported: new Date(),
    });

    const matchedFound = await FoundItem.findOne({
      name,
      model,
      color,
      locationFound: locationLost,
    });

    if (matchedFound) {
      await Match.create({
        lostItem: lostItem._id,
        foundItem: matchedFound._id,
        status: "pending",
      });
    }

    res.status(201).json({ message: "Lost item reported", lostItem });
  } catch (error) {
    console.error("Lost item error:", error.message || error);
    res.status(500).json({ error: "Failed to save lost item" });
  }
};

exports.searchLostItems = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    const items = await LostItem.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { model: { $regex: query, $options: "i" } },
        { color: { $regex: query, $options: "i" } },
        { locationLost: { $regex: query, $options: "i" } },
      ]
    });

    res.status(200).json(items);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};

//  GET all lost items (for dashboard)
exports.getAllLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().sort({ dateLost: -1 });
    res.json(items);
  } catch (err) {
    console.error("Get lost items error:", err.message || err);
    res.status(500).json({ error: "Failed to fetch lost items" });
  }
};

