const fs = require("fs");
// const input = fs.readFileSync("./test.txt", "utf-8")
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1);
// [dx,dy]
const DIR = [
  [-1,-1], [0,-1], [1,-1],
  [-1,0],          [1,0],
  [-1,1],  [0,1],  [1,1],
];

function inBounds(row, col, layout = input) {
  return (0 <= row && row < layout.length) &&
    (0 <= col && col < layout[row].length);
}

function countAdjSeats(layout, row, col, cond = "#") {
  let count = 0;

  for(let i = 0; i < DIR.length; i++) {
    let [c, r] = DIR[i];

    if(inBounds(row + r, col + c)) {
      if(layout[row+r][col+c] === cond) count++;
    }
  }

  return count;
}

function countVisibleSeats(layout, row, col, cond = "#") {
  let count = 0;

  for(let i = 0; i < DIR.length; i++) {
    let [dx, dy] = DIR[i];

    for(let inc = 1; inc < layout.length; inc++) {
      let r = inc * dy, c = inc * dx;
      if(!inBounds(row + r, col + c)) break;

      if(layout[row+r][col+c].match(/L|#/)) {
        if(layout[row+r][col+c] === cond) count++;
        break;
      }
    }
  }

  return count;
}

function seatingModelOne(layout, row, col) {
  let occupied = countAdjSeats(layout, row, col);

  switch(layout[row][col]) {
    case "L":
      if(occupied == 0) return "#";
    case "#":
      if(occupied >= 4) return "L";
    default:
      return layout[row][col];
  }
}

function seatingModelTwo(layout, row, col) {
  let occupied = countVisibleSeats(layout, row, col);

  // console.log(row, col, layout[row][col], occupied);

  switch(layout[row][col]) {
    case "L":
      if(occupied == 0) return "#";
    case "#":
      if(occupied >= 5) return "L";
    default:
      return layout[row][col];
  }
}

function getNewSeatLayout(layout, seatingModel) {
  let newLayout = [];

  for(let row = 0; row < layout.length; row++) {
    let seatRow = layout[row].split("");

    for(let col = 0; col < layout[row].length; col++) {
      seatRow[col] = seatingModel(layout, row, col);
    }
    newLayout.push(seatRow.join(""));
  }

  return newLayout;
}

// am going to assume first/second will always be the same
// size
function sameSeatLayout(first, second) {
  for(let row = 0; row < first.length; row++) {
    if(first[row] !== second[row]) return false;
  }
  return true;
}

function findFinalSeatLayout(layout, seatingModel) {
  let prev, next = layout.slice();

  do {
    // console.log(next);
    prev = next;
    next = getNewSeatLayout(prev, seatingModel);
  } while(!sameSeatLayout(prev, next));

  return next;
}

function countOccupiedSeats(layout) {
  let count = 0;

  for(let row = 0; row < layout.length; row++) {
    for(let col = 0; col < layout[row].length; col++) {
      if(layout[row][col] === "#") count++;
    }
  }

  return count;
}

function printLayout(layout) {
  console.log("[");
  layout.forEach(s => console.log(s));
  console.log("]");
}

// PART 1.
let final = findFinalSeatLayout(input, seatingModelOne);
let occupied = countOccupiedSeats(final);
console.log(occupied);

// PART 2.
final = findFinalSeatLayout(input, seatingModelTwo);
occupied = countOccupiedSeats(final);
// printLayout(final);
console.log(occupied);

// it's a little slow... but it works!
