const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
