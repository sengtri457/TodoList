const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. Study, Gym, Social
  icon: { type: String }, // optional icon name
  color: { type: String, default: "#FFFFFF" },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Category", categorySchema);
