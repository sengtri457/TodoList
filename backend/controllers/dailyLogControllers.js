const DailyLog = require("../models/DailyLog");

const getDailyLogs = async (req, res) => {
  const logs = await DailyLog.find().sort({ date: -1 });
  res.json(logs);
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

module.exports = {
  getDailyLogs,
  createDailyLog,
  updateDailyLog,
  getDailyLogByUserId,
};
