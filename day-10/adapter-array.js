const fs = require("fs");
// const input = fs.readFileSync("./tests/test1.txt", "utf-8")
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1).map(x => Number(x))
  .sort((a, b) => a - b);

function countAdaptersInChain(input) {
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

function countAdapterChains(input) {
  let visited = {
    1: 1, 2: 1, 3: 1,
  };
  let target = input[input.length - 1];

  for(let i = 0; i < input.length; i++) {
    let curr = input[i];
    if(!visited[curr]) visited[curr] = 1;
    
    for(let jolt = 1; jolt <= 3; jolt++) {
      let next = curr + jolt;
      if(!input.includes(next)) continue;

      if(!visited[next]) visited[next] = 0;
      visited[next] += visited[curr];
    }
  }

  // console.log(visited);
  return visited[target];
}

let adapters = countAdaptersInChain(input);
let {jolt1, jolt3} = adapters;
let chainCount = countAdapterChains(input);

console.log(jolt1 * jolt3);
console.log(chainCount);
