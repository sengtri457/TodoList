const mongoose = require("mongoose");
const dailyLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  mood: { type: String }, // e.g. "happy", "tired", "focused"
  topWins: [{ type: String }], // e.g. ["Good workout", "Finished project"]
  notes: { type: String },
  totalScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("DailyLog", dailyLogSchema);
