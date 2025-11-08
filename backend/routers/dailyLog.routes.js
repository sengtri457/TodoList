const express = require("express");
const router = express.Router();
const {
  getDailyLogs,
  createDailyLog,
  updateDailyLog,
  getDailyLogByUserId,
  sortTotalScore,
  deletedDailyLogs,
} = require("../controllers/dailyLogControllers");
const { protect } = require("../middlewares/authMiddleware");
router.get("/sort", sortTotalScore);
router.get("/", protect, getDailyLogs);
router.get("/:userId", protect, getDailyLogByUserId);
router.post("/", protect, createDailyLog);
router.put("/:id", protect, updateDailyLog);
router.delete("/:id", protect, deletedDailyLogs);

module.exports = router;
