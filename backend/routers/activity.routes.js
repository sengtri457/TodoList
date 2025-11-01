const express = require("express");
const {
  getActivities,
  createActivity,
  deleteActivity,
} = require("../controllers/activityControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getActivities);
router.post("/", protect, createActivity);
router.delete("/:id", protect, deleteActivity);

module.exports = router;
