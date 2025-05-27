const Match = require("../models/Match");

exports.confirmMatch = async (req, res) => {
  try {
    const { matchId, confirm } = req.body;
    const match = await Match.findById(matchId).populate("lostItem foundItem");

    if (!match) return res.status(404).json({ error: "Match not found" });

    match.status = confirm ? "confirmed" : "rejected";
    await match.save();

    if (confirm) {
      await match.lostItem.remove();
      await match.foundItem.remove();
    }

    res.json({ message: `Match ${confirm ? "confirmed" : "rejected"}` });
  } catch (err) {
    res.status(500).json({ error: "Match update failed" });
  }
};
