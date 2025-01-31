const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    res.status(200).json({ message: "Token verified", userId: req.userId });
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authenticateToken;
