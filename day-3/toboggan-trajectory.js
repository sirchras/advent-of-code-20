const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let slopes = [
  checkTrajectory(1, 1), // 84 ?
  checkTrajectory(3, 1), // count should be 195
  checkTrajectory(5, 1), // 70 ?
  checkTrajectory(7, 1), // 70 ?
  checkTrajectory(1, 2) // 47 ?
];

rl.on('line', (line) => {
  slopes.forEach(slope => {
    slope.checkForTree(line);
  });
}).on('close', () => {
  let product = 1;
  slopes.forEach((slope, idx) => {
    console.log(`slope${idx+1}`, slope.getTreeCount());
    product *= slope.getTreeCount();
  });
  console.log("product:", product);
});

function checkTrajectory(dx, dy) {
  let x = 0, y = 0, treeCount = 0;

  let checkForTree = function(line) {
    if(y % dy == 0) {
      if(line[x] === "#") treeCount++;
      // console.log(x, y, line, `\t${line[x]}`, treeCount);
      x = (x + dx) % line.length;
    }
    y++;
  };

  let getTreeCount = function() {
    return treeCount;
  };

  return {checkForTree, getTreeCount};
}
