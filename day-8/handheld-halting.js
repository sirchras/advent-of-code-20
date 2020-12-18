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

function printInstruction(idx, instruction) {
  let {op, sign, num} = instruction;

  console.log(idx, (idx >= 100 ? "" : "\t"),
    `${op} ${sign} ${num}`);
}

function runInstructions(input) {
  let visited = [];
  let acc = 0, idx = 0, err = false;

  while(idx < input.length) {
    let instruction = parseInstruction(input[idx]);
    if(!instruction) {
      if(idx == input.length - 1) break;
      throw new Error(`Missing instruction @idx:${idx}`);
    }

    let {op, sign, num} = instruction;
    visited.push(idx);
    // printInstruction(idx, instruction);

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

    if(visited.includes(idx)) {
      // found loop
      err = true;
      break;
    }
  }

  return {err, acc, visited, input};
}

function findPotentialBugs(input) {
  let potentialBugs = [];

  for(let i = 0; i < input.length; i++) {
    let instruction = parseInstruction(input[i]);
    if(!instruction) continue;

    let {op, sign, num} = instruction;
    if(op.match(/jmp|nop/)) {
      // I'm assuming here that instructions w/ jmp or
      // nop +1 are redundant, and don't need to be
      // considered
      if(num != 1 || sign != "+") potentialBugs.push(i);
    }
  }

  return potentialBugs;
}

function swapOperations(input) {
  let {op} = parseInstruction(input);
  let newOp = (op == "nop" ? "jmp" : "nop");

  return input.replace(op, newOp);
}

function debugInstructions(input) {
   let potentialBugs = findPotentialBugs(input);

   for(let bIdx of potentialBugs) {
     let bugFix = input.slice();
     bugFix[bIdx] = swapOperations(bugFix[bIdx]);

    let output = runInstructions(bugFix);
    if(!output.err) return output;
   }
}

let acc = runInstructions(input).acc;
let fixed = debugInstructions(input);

console.log(`acc: ${acc}`);
console.log(`final acc: ${fixed.acc}`);

fixed.visited.forEach(idx => {
  let instruction = parseInstruction(fixed.input[idx]);
  // if(instruction.op == "acc")
  printInstruction(idx, instruction);
});
