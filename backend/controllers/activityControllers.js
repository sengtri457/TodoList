const Activity = require("../models/Activity");
const DailyLog = require("../models/DailyLog");
const updateDailyScore = async (dailyLogId) => {
  const activities = await Activity.find({ dailyLogId });
  if (activities.length === 0) return;

  const avgRating =
    activities.reduce((acc, cur) => acc + (cur.rating || 0), 0) /
    activities.length;
  await DailyLog.findByIdAndUpdate(dailyLogId, {
    totalScore: avgRating.toFixed(1),
  });
};

const getActivities = async (req, res) => {
  const activities = await Activity.find()
    .populate("categoryId")
    .populate("dailyLogId");
  res.json(activities);
};

const createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await updateDailyScore(activity.dailyLogId);
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (deleted) {
      await updateDailyScore(deleted.dailyLogId);
    }
    res.json({ message: "Activity deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  updateDailyScore,
  getActivities,
  createActivity,
  deleteActivity,
};
