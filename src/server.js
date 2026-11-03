const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // Loads variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. CONNECT TO MONGODB
// ==========================================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("Database connection error:", err));

// ==========================================
// 2. DEFINE A MONGOOSE SCHEMA & MODEL
// ==========================================
// This defines the shape of the data in your database
const submissionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    trim: true,
    minlength: [2, "Username must be at least 2 characters long."],
    // This regular expression ONLY allows letters (A-Z, a-z) and spaces.
    // It will reject numbers like "12" or symbols!
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

const Submission = mongoose.model("Submission", submissionSchema);

// ==========================================
// 3. MIDDLEWARE
// ==========================================
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==========================================
// 4. ROUTES
// ==========================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Handle POST request and save to MongoDB
app.post("/submit", async (req, res) => {
  try {
    // 1. Create and save the new document
    const newSubmission = new Submission({
      username: req.body.username,
      message: req.body.message,
    });

    await newSubmission.save();

    console.log(`Saved validated submission from ${req.body.username}`);
    res.send(`
      <h2>Success!</h2>
      <p>Your message was validated and saved securely.</p>
      <a href="/">Back Home</a>
    `);
  } catch (error) {
    // 2. Check if it's a Mongoose validation error
    if (error.name === "ValidationError") {
      let errors = [];
      for (let field in error.errors) {
        errors.push(error.errors[field].message);
      }

      // Send a 400 Bad Request response with the error messages
      return res.status(400).send(`
        <h2>Validation Error</h2>
        <p style="color: red;">${errors.join("<br>")}</p>
        <a href="/">Try Again</a>
      `);
    }

    // 3. Catch-all for other unexpected server errors (like database loss)
    console.error("Server error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Optional: A route to view everything stored in the database
app.get("/submissions", async (req, res) => {
  try {
    const allSubmissions = await Submission.find({});

    // Render a simple HTML list of stored items
    let html = "<h2>All Stored Submissions</h2><ul>";
    allSubmissions.forEach((sub) => {
      html += `<li><strong>${sub.username}</strong>: ${sub.message} <em>(${sub.createdAt})</em></li>`;
    });
    html += "</ul><a href='/'>Back Home</a>";

    res.send(html);
  } catch (error) {
    res.status(500).send("Error fetching submissions.");
  }
});

// 404 Catch-all
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

// ==========================================
// 5. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`Server running live at http://localhost:${PORT}`);
});
