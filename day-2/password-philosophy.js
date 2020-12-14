const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let validCount = 0;

rl.on('line', (line) => {
  // policyOne(line);
  policyTwo(line);
});

function parseInput(line) {
  [params, password] = line.split(": ");
  [range, letter] = params.split(" ");
  [a, b] = range.split("-").map(s => Number(s));

  return [a, b, letter, password];
}

function sameChar(c1, c2) {
  return c1 === c2;
}

function policyOne(line) {
  [min, max, letter, password] = parseInput(line);
  let matching = password.split("").filter(char => sameChar(char, letter));

  if(min <= matching.length && matching.length <= max) {
    validCount++;
    console.log(`${password} is valid`, validCount);
  }
}

function policyTwo(line) {
  [i, j, letter, password] = parseInput(line);
  // console.log(i, j, letter, password);
  let pos1 = password[i - 1];
  let pos2 = password[j - 1];

  if(!sameChar(pos1, pos2) && (sameChar(pos1, letter) || sameChar(pos2, letter))) {
    validCount++;
    console.log(`${password} is valid`, validCount);
  }
}
