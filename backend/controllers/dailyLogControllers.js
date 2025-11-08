const DailyLog = require("../models/DailyLog");

const getDailyLogs = async (req, res) => {
  const search = req.query.search?.trim();

  let filter = {};
  if (search) {
    filter.mood = { $regex: search, $options: "i" };
  }

  const logs = await DailyLog.find(filter).sort({ mood: 1 });
  res.json(logs);
};

const sortTotalScore = async (req, res) => {
  try {
    const sortType = req.query.totalScore?.trim()?.toLowerCase();
    let sortOption = {};

    if (!sortType || sortType === "all") {
      sortOption = { totalScore: 1 };
    } else if (sortType === "asc") {
      sortOption = { totalScore: 1 };
    } else if (sortType === "desc") {
      sortOption = { totalScore: -1 };
    } else {
      return res.status(400).json({ error: "Invalid sort type" });
    }

    const logs = await DailyLog.find().sort(sortOption);

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDailyLog = async (req, res) => {
  try {
    const log = new DailyLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateDailyLog = async (req, res) => {
  try {
    const updated = await DailyLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getDailyLogByUserId = async (req, res) => {
  try {
    const logs = await DailyLog.find({ userId: req.params.userId }).sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletedDailyLogs = async (req, res) => {
  try {
    const dailylogs = await DailyLog.findByIdAndDelete(req.params.id);
    res.json({ message: "All logs deleted successfully" });
    res.status(202).json(dailylogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getDailyLogs,
  createDailyLog,
  updateDailyLog,
  getDailyLogByUserId,
  deletedDailyLogs,
  sortTotalScore,
};
