const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "User registered successfully!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    user.status = "online";
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });
    return res.json({ message: "Login successful!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.pararms;
    const userData = await User.findById(id).select("-password");
    console.log(userData);
    if (!userData) return res.status(404).json({ error: "User not found" });
    return res.json({
      userData,
      message: "User profile retrieved successfully!",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    user.status = "offline";
    await user.save();
    res.clearCookie("authToken");
    return res.json({ message: "Logout successful!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
