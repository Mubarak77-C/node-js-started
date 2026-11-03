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

// function myfunction() {
//   try {
//     const div = (a, b) => a / b;
//     const resultDiv = div(0 / 1);
//     // console.log("division of 0/1", resultDiv);
//     // console.error(resultDiv);
//   } catch (error) {
//     console.error("division error is :", error);
//   }
// }

// myfunction();
