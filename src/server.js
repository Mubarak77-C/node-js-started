const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // 1. Point to the public folder relative to src/server.js
  let filePath = path.join(__dirname, "../public");

  // 2. Map req.url to the correct HTML file
  if (req.url === "/" || req.url === "/index") {
    filePath = path.join(filePath, "index.html");
  } else if (req.url === "/about") {
    filePath = path.join(filePath, "about.html");
  } else if (req.url === "/contact-me") {
    filePath = path.join(filePath, "contact-me.html");
  } else {
    // If the URL doesn't match anything, point to 404.html
    filePath = path.join(filePath, "404.html");
  }

  // 3. Read the file asynchronously using fs.readFile
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Fallback if something goes catastrophically wrong (e.g. file is missing)
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
      return;
    }

    // 4. Determine status code (404 for bad routes, 200 for good ones)
    const isValidRoute =
      req.url === "/" ||
      req.url === "/index" ||
      req.url === "/about" ||
      req.url === "/contact-me";

    const statusCode = isValidRoute ? 200 : 404;

    // 5. Send the HTML file back to the browser
    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
