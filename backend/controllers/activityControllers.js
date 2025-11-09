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
  try {
    const search = req.query.search?.trim();
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    const activities = await Activity.find(filter)
      .populate("categoryId")
      .populate("dailyLogId");
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATED createActivity: populate after save
const createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await updateDailyScore(activity.dailyLogId);

    // Populate before sending back
    const populatedActivity = await Activity.findById(activity._id)
      .populate("categoryId")
      .populate("dailyLogId");

    res.status(201).json(populatedActivity);
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

const getActivityByDailylogIdAndCategory = async (req, res) => {
  try {
    const { dailyLogId, categoryId } = req.params;
    const activity =
      (await Activity.findOne({
        "dailyLogId._id": dailyLogId,
        "categoryId._id": categoryId,
      })) ||
      (await Activity.findOne({
        dailyLogId,
        categoryId,
      }));

    if (!activity) {
      return res.status(404).json({
        message: "No activity found for this dailyLogId and categoryId.",
      });
    }

    // ✅ populate for this endpoint too
    await activity.populate("categoryId").populate("dailyLogId");

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  updateDailyScore,
  getActivities,
  createActivity,
  deleteActivity,
  getActivityByDailylogIdAndCategory,
};
