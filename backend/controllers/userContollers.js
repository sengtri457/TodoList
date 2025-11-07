const User = require("../models/User");

const AddUser = async (req, res) => {
  try {
    const users = await User.create(req.body);
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const search = req.query.search?.trim();

    let filter = {};
    if (search) {
      filter.username = { $regex: search, $options: "i" };
    }

    const users = await User.find(filter).sort({ username: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const filterUsersByStatus = async (req, res) => {
  try {
    const status = req.query.status?.trim();
    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }
    // If status is "all", return everything
    if (!status || status.toLowerCase() === "all") {
      const users = await User.find().sort({ username: 1 });
      return res.status(200).json(users);
    }

    const users = await User.find({
      status: { $regex: "^" + status + "$", $options: "i" },
    }).sort({ username: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletedUser = async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  AddUser,
  getUser,
  getUserById,
  deletedUser,
  updateUser,
  filterUsersByStatus,
};
