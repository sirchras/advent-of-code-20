const fs = require("fs");
// const input = fs.readFileSync("./test.txt", "utf-8")
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1);

function inBounds(layout, row, col) {
  return (0 <= row && row < layout.length) &&
    (0 <= col && col < layout[row].length);
}

function countAdjSeats(layout, row, col, condition) {
  let count = 0;

  for(let r = -1; r <= 1; r++) {
    for(let c = -1; c <= 1; c++) {
      if(r == 0 && c == 0) continue;

      if(inBounds(layout, row + r, col + c)) {
        if(layout[row+r][col+c] === condition) count++;
      }
    }
  }

  return count;
}

function getNewSeatLayout(layout) {
  let newLayout = [];

  for(let row = 0; row < layout.length; row++) {
    let seatRow = layout[row].split("");

    for(let col = 0; col < layout[row].length; col++) {
      let occupied = countAdjSeats(layout, row, col, "#");

      switch(layout[row][col]) {
        case "L":
          if(occupied == 0) seatRow[col] = "#";
          break;
        case "#":
          if(occupied >= 4) seatRow[col] = "L";
          break;
      }
    }
    newLayout.push(seatRow.join(""));
  }

  return newLayout;
}

// am going to assume first/second will always be the same
// size
function sameSeatLayout(first, second) {
  for(let row = 0; row < first.length; row++) {
    for(let col = 0; col < first[row].length; col++) {
      if(first[row][col] !== second[row][col]) 
        return false;
    }
  }
  return true;
}

function findFinalSeatLayout(layout) {
  let prev, next = layout.slice();

  do {
    // console.log(next);
    prev = next;
    next = getNewSeatLayout(prev);
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

let final = findFinalSeatLayout(input);
let occupied = countOccupiedSeats(final);
console.log(occupied);

// I don't understand why, but my code doesn't work
// (off by one) for the example, but works for the actual
// input?!
