const path = require("path");
const Submission = require("../models/submission");

// Render the Home page
exports.getHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
};

// Handle POST form submission and save to MongoDB with validation
exports.createSubmission = async (req, res) => {
  try {
    const newSubmission = new Submission({
      username: req.body.username,
      message: req.body.message,
    });

    await newSubmission.save();
    console.log(`Saved validated submission from ${req.body.username}`);

    res.send(`
      <h2>Success!</h2>
      <p>Your message was validated and saved securely to MongoDB Atlas.</p>
      <a href="/">Back Home</a> | <a href="/submissions">View All Submissions</a>
    `);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = [];
      for (let field in error.errors) {
        errors.push(error.errors[field].message);
      }

      return res.status(400).send(`
        <h2>Validation Error</h2>
        <p style="color: red;">${errors.join("<br>")}</p>
        <a href="/">Try Again</a>
      `);
    }

    console.error("Server error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch and display all submissions from MongoDB
exports.getSubmissions = async (req, res) => {
  try {
    const allSubmissions = await Submission.find({});

    let html = "<h2>All Stored Submissions</h2><ul>";
    allSubmissions.forEach((sub) => {
      html += `<li><strong>${sub.username}</strong>: ${sub.message} <em>(${sub.createdAt})</em></li>`;
    });
    html += "</ul><a href='/'>Back Home</a>";

    res.send(html);
  } catch (error) {
    res.status(500).send("Error fetching submissions.");
  }
};
