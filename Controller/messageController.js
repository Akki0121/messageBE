const Message = require("../Models/messageModel");

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content, isReplyTo } = req.body;
    const senderId = req.userId;
    const message = new Message({ senderId, receiverId, content, isReplyTo });
    await message.save();
    res.status(201).json({ message: "Message sent successfully!", message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.query;
    const messages = await Message.find({ receiverId: userId }).populate(
      "senderId receiverId isReplyTo"
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
