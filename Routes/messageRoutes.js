const express = require("express");
const { sendMessage, getMessages } = require("../Controller/messageController");
const authenticateToken = require("../Middleware/auth");

const router = express.Router();

router.post("/send", authenticateToken, sendMessage);
router.get("/", authenticateToken, getMessages);

module.exports = router;
