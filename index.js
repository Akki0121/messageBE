const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const authenticateToken = require("./middleware/auth");

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(require("cors")({
  origin: true,
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.get("/verify", authenticateToken);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/messages", messageRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
