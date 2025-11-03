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
    const users = await User.find();
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
};
