const express = require("express");
const router = express.Router();
const {
  AddUser,
  getUser,
  getUserById,
  updateUser,
  deletedUser,
} = require("../controllers/userContollers");

router.post("/", AddUser);
router.get("/", getUser);
router.get("/:id", getUserById);
router.delete("/:id", deletedUser);
router.put("/:id", updateUser);

module.exports = router;
