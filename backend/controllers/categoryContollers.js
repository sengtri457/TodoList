const Category = require("../models/ Category");

const getCategories = async (req, res) => {
  const search = req.query.search?.trim();
  let filter = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  const categories = await Category.find(filter).sort({ name: 1 });
  res.status(202).json(categories);
};

const filterCategoryColor = async (req, res) => {
  const color = req.query.color?.trim();
  if (!color) {
    return res.status(400).json({ message: "Color required" });
  }
  // If status is "all", return everything
  if (!color || color.toLowerCase() === "all") {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json(categories);
  }

  const categories = await Category.find({
    status: { $regex: "^" + color + "$", $options: "i" },
  }).sort({ name: 1 });
  res.status(202).json(categories);
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
  filterCategoryColor,
};
