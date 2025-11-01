const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  dailyLogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DailyLog",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: { type: String, required: true },
  startTime: { type: String }, // "07:30"
  endTime: { type: String },
  duration: { type: Number }, // in minutes or hours
  energy: { type: String }, // e.g. "High", "Medium", "Low"
  rating: { type: Number, min: 1, max: 10 },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
