const Category = require("../models/ Category");

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
