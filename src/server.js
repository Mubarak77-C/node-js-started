const http = require("http");

// Define the port your server will listen on
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content Type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send the response body "Hello World"
  res.end("Hello from my Node.js HTTP server!\n");
});

// Start listening for incoming requests on port 3000
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
