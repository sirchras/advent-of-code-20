const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n");

function parseInstruction(input) {
  if(input.length == 0) return null; // no input

  let [op, arg] = input.split(" ");
  let sign = arg.substring(0, 1);
  let num = Number(arg.substring(1));

  return {op, sign, num};
}

let visited = [];
let acc = 0, idx = 0;

while(idx < input.length) {
  let instruction = parseInstruction(input[idx]);
  if(!instruction) throw new Error("No instruction");

  let {op, sign, num} = instruction;
  visited.push(idx);
  // console.log(idx, op, sign, num);

  switch(op) {
    case "jmp":
      sign == "+" ? idx += num : idx -= num;
      break;
    case "acc":
      sign == "+" ? acc += num : acc -= num;
    case "nop":
    default:
      idx++;
      break;
  }

  if(visited.includes(idx)) break; // found loop
}

console.log(`acc: ${acc}`);
