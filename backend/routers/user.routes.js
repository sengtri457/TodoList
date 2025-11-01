const express = require("express");
const router = express.Router();
const {
  AddUser,
  getUser,
  getUserById,
} = require("../controllers/userContollers");

router.post("/", AddUser);
router.get("/", getUser);
router.get("/:id", getUserById);

module.exports = router;
