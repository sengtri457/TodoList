const express = require("express");
const router = express.Router();
const {
  getDailyLogs,
  createDailyLog,
  updateDailyLog,
  getDailyLogByUserId,
} = require("../controllers/dailyLogControllers");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getDailyLogs);
router.get("/:userId", protect, getDailyLogByUserId);
router.post("/", protect, createDailyLog);
router.put("/:id", protect, updateDailyLog);

module.exports = router;
