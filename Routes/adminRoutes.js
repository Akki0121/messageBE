const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../Controller/adminController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, getAllUsers);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;
