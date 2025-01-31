const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../Controller/adminController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/list-users", authenticateToken, getAllUsers);
router.put("/update/:id", authenticateToken, updateUser);
router.delete("/delete-user/:id", authenticateToken, deleteUser);

module.exports = router;
