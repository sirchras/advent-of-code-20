const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1).map(x => Number(x));

function verifyXMAS(num, preamble) {
  for(let i = 0; i < preamble.length; i++) {
    for(let j = 0; j < preamble.length; j++) {
      if(i == j) continue;

      if(preamble[i] + preamble[j] == num) return true;
    }
  }
  return false;
}

for(let i = 25; i < input.length; i++) {
  let preamble = input.slice(i - 25, i);
  if(!verifyXMAS(input[i], preamble)) {
    console.log(input[i]);
    break;
  }
}
