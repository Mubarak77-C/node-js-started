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
