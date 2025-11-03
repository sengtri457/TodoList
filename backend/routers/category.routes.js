const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryContollers");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getCategories);
router.post("/", protect, createCategory);
router.get("/:id", protect, getCategoryById);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
