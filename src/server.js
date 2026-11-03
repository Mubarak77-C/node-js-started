const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// 1. Static Middleware: Automatically serves CSS, images, and static assets from 'public/'
app.use(express.static(path.join(__dirname, "../public")));

// 2. Define explicit routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/contact-me.html"));
});

// 3. Dynamic Route Parameters
app.get("/users/:userId/posts/:postId", (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  res.send(`Fetching Post #${postId} written by User ID: ${userId}`);
});

// 4. Query Strings Route
app.get("/search", (req, res) => {
  const searchTerm = req.query.query;
  const sortBy = req.query.sort || "asc";
  const page = req.query.page || 1;

  res.send(
    `Searching for: "${searchTerm}" | Sorted by: ${sortBy} | Page: ${page}`,
  );
});

// 5. 404 Catch-all Middleware (MUST BE AT THE VERY BOTTOM!)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

// 6. Start server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
