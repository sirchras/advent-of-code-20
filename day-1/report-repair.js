const input = require("./input.js").input;

function findTwoEntries() {
  for(let i = 0; i < input.length; i++) {
    for(let j = i + 1; j < input.length; j++) {
      if(sumEqualTo2020(input[i], input[j])) {
        return {
          x: input[i], y: input[j]
        };
      }
    }
  }
}

function findThreeEntries() {
  // console.log("hello world");
  for(let i = 0; i < input.length; i++) {
    for(let j = i + 1; j < input.length; j++) {
      for(let k = j + 1; k < input.length; k++) {
        if(sumEqualTo2020(input[i], input[j], input[k])) {
          return {
            a: input[i], b: input[j], c: input[k]
          };
        }
      }
    }
  }
}

function sumEqualTo2020(...args) {
  let sum = 0;
  args.forEach(x => {
    sum += x;
  });
  return sum == 2020;
}

let {x, y} = findTwoEntries();
console.log(x, y, x + y);
console.log(x, "*", y, "=", x * y);

let {a, b, c} = findThreeEntries();
console.log(a, b, c);
console.log(`${a} * ${b} * ${c} = ${a * b * c}`);
