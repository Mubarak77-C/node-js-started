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
  username: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
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
    // 1. Create a new document using the Mongoose Model
    const newSubmission = new Submission({
      username: req.body.username,
      message: req.body.message,
    });

    // 2. Save it to the database asynchronously
    await newSubmission.save();

    console.log(`Saved submission from ${req.body.username} to database!`);

    res.send(`
      <h2>Success! Data Saved to Database.</h2>
      <p>Thank you, <strong>${req.body.username}</strong>. Your message has been stored permanently.</p>
      <a href="/">Back Home</a> | <a href="/submissions">View All Submissions</a>
    `);
  } catch (error) {
    console.error("Error saving to database:", error);
    res.status(500).send("Internal Server Error: Could not save data.");
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
