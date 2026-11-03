const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    trim: true,
    minlength: [2, "Username must be at least 2 characters long."],
    match: [
      /^[A-Za-z\s]+$/,
      "Username can only contain letters, no numbers or symbols allowed.",
    ],
  },
  message: {
    type: String,
    required: [true, "Message cannot be empty!"],
    trim: true,
    maxlength: [500, "Message cannot exceed 500 characters."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
