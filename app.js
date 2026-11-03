console.log("Hello from Node.js on Ubuntu!");

const greeting =
  "Let's build some amazing backend projects with The Odin Project!";
console.log(greeting);

function sum(a, b) {
  return a + b;
}
const result = sum(2, 2);
console.log(`sum of 2 + 2 is: ${result}`);

const diff = (a, b) => a - b;
const resultDiff = diff(0, 2);
console.log("2-2 is ", resultDiff);

function myfunction() {
  try {
    const div = (a, b) => {
      // Explicitly check for division by zero or missing values
      if (b === 0 || b === undefined) {
        throw new Error("Cannot divide by zero or missing denominator!");
      }
      return a / b;
    };

    // Passing 0 as the second argument to trigger the check
    const resultDiv = div(1, 0); //here argument pass to parameter a,b with value 1,0
    console.log("division result:", resultDiv);
  } catch (error) {
    console.error("division error is:", error.message);
  }
}

myfunction();

// A simulated async function that fetches user data

const fetchData = (userID) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userID) {
        reject(new Error("User id is required!"));
      } else {
        resolve({ id: userID, name: "Alice", role: "Developer" });
      }
    }, 3000);
  });
};

async function getUSerProfile(userID) {
  try {
    console.log("Fetching user data...");

    // We 'await' the promise. If it rejects, it jumps to catch.
    const userData = await fetchData(userID);
    console.log("Success USer found ! ", userData);
  } catch (error) {
    console.error("failed to fetch user profile ", error.message);
  } finally {
    console.log(
      "Cleanup or final step (runs whether it succeeded or failed).\n",
    );
  }
}
getUSerProfile(43);
//getUSerProfile(null);

// Data sent from the client to the server
const body = {
  title: "foo",
  body: "bar",
  userId: 1,
};

async function main() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "User-Agent": "undici-stream-example",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  // returns something like:
  // { title: 'foo', body: 'bar', userId: 1, id: 101 }
}

main().catch(console.error);

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // You can check req.url to see what the user typed (e.g., "/", "/about")
  let filePath = path.join(__dirname, "../public"); // (depending on where your html files are)

  // Example logic for routing based on req.url...
});
