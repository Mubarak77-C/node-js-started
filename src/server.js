const express = require("express");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const submissionRoutes = require("./routes/submissionRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Connect to MongoDB
connectDB();

// 2. Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Mount Routers
app.use("/", submissionRoutes);

// 4. 404 Catch-all Middleware (Must be last!)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"));
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(`MVC Server running live at http://localhost:${PORT}`);
});
