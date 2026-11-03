const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, "../public");

  // 1. Handle HTML routes
  if (req.url === "/" || req.url === "/index") {
    filePath = path.join(filePath, "index.html");
  } else if (req.url === "/about") {
    filePath = path.join(filePath, "about.html");
  } else if (req.url === "/contact-me") {
    filePath = path.join(filePath, "contact-me.html");
  } else if (req.url.endsWith(".css")) {
    // 2. If the request asks for a .css file, look for it in the public folder
    filePath = path.join(filePath, req.url);
  } else {
    // 3. Fallback to 404 for unknown routes
    filePath = path.join(filePath, "404.html");
  }

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }

    // Determine the correct Content-Type header based on file extension
    let contentType = "text/html";
    if (filePath.endsWith(".css")) {
      contentType = "text/css";
    }

    const statusCode = req.url === "/bad-route-check" ? 404 : 200; // (or keep your route check logic)

    res.writeHead(statusCode, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
