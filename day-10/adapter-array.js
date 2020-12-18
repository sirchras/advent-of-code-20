const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1).map(x => Number(x));

for(let i = 0; i < input.length; i++) {
  console.log(input[i]);
}
