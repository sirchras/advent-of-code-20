const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let groups = [], idx = 0;

rl.on('line', (line) => {
  if(!groups[idx]) groups[idx] = {size: 0, yesA: []};

  if(line.length > 0) {
    let group = groups[idx];
    let yesA = line.split("");

    yesA.forEach(question => {
      if(!group.yesA.includes(question)) {
        group.yesA.push(question);
        group[question] = 1;
      } else {
        group[question]++;
      }
    });

    group.size++;
  } else {
    idx++;
  }
}).on('close', () => {
  let yesSum = 0, consensusSum = 0;

  groups.forEach(group => {
    yesSum += group.yesA.length;
    group.yesA.forEach(question => {
      if(group[question] == group.size) {
        consensusSum++;
      }
    });
  });

  console.log(yesSum);
  console.log(consensusSum);
});
