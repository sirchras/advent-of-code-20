const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8")
    .split("\n").slice(0, -1).map(x => Number(x))
    .sort((a, b) => a - b);

function chainAdapters(input) {
  let jolt1 = 0, jolt3 = 1;

  for(let i = 0; i < input.length; i++) {
    let d = input[i] - (input[i-1] || 0);

    switch(d) {
      case 1:
        jolt1++;
        break;
      case 3:
        jolt3++;
        break;
    }
  }

  return {jolt1, jolt3};
}

let adapters = chainAdapters(input);
let {jolt1, jolt3} = adapters;
console.log(jolt1 * jolt3);
