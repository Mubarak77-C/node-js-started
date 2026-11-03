const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// ==========================================
// 1. MIDDLEWARE
// ==========================================
// Serve static assets (HTML, CSS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, "../public")));

// Parse incoming form data (URL-encoded) and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==========================================
// 2. GET ROUTES (Static & Dynamic)
// ==========================================

// Home route (serves index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Route Parameters example: /users/:userId/posts/:postId
app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.send(
    `<h2>Profile: ${userId}</h2><p>Viewing Post ID: ${postId}</p><a href="/">Back Home</a>`,
  );
});

// Query Strings example: /search?query=nodejs&sort=desc
app.get("/search", (req, res) => {
  const searchTerm = req.query.query || "None";
  const sortBy = req.query.sort || "asc";

  res.send(`
    <h2>Search Results</h2>
    <p>Searching for: <strong>${searchTerm}</strong></p>
    <p>Sorted by: <strong>${sortBy}</strong></p>
    <a href="/">Back Home</a>
  `);
});

// ==========================================
// 3. POST ROUTE (Handling Form Submissions)
// ==========================================
app.post("/submit", (req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  console.log(`New form submission from ${username}: "${message}"`);

  res.send(`
    <h2>Thank you, ${username}!</h2>
    <p>We successfully received your message: "<em>${message}</em>"</p>
    <a href="/">Go Back Home</a>
  `);
});

// ==========================================
// 4. 404 CATCH-ALL MIDDLEWARE (Must be last!)
// ==========================================
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

// ==========================================
// 5. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`Server running live at http://localhost:${PORT}`);
});
