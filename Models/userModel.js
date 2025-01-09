const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["User", "Admin"],
      required: true,
    },
    password: { type: String, required: true },
    status: { type: String, enum: ["online", "offline"], default: "offline" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
