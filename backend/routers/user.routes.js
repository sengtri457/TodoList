const express = require("express");
const router = express.Router();
const {
  AddUser,
  getUser,
  getUserById,
  updateUser,
  deletedUser,
  filterUsersByStatus,
} = require("../controllers/userContollers");

router.post("/", AddUser);
router.get("/status", filterUsersByStatus);
router.get("/", getUser);
router.get("/:id", getUserById);
router.delete("/:id", deletedUser);
router.put("/:id", updateUser);

module.exports = router;
