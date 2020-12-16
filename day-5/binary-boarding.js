const fs = require("fs");
const readline = require("readline");
const {partition,scanBoardingPass} = require("./functions.js");

const runTests = require("./tests/test.js");

runTests();

// console.log(scanBoardingPass("FL"));
// console.log(scanBoardingPass("FBFBBFFRLR"));

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity
});

let highestId = 0;
let seats = [];
rl.on("line", (line) => {
  let pass = scanBoardingPass(line);
  // console.log(pass);
  let row = pass.row[0], col = pass.col[0];
  let seatId = row * 8 + col;
  // console.log(line, row, col, seatId);
  seats.push(seatId);
  if(seatId > highestId) highestId = seatId;
}).on("close", () =>{
  seats.sort((a, b) => a - b);
  let seat = seats[0];
  for(let i = 1; i < seats.length; i++) {
    // console.log(seat, seats[i]);
    if(seat != seats[i] - 1) {
      seat++;
      break;
    }
    seat = seats[i];
  }
  console.log(`highest seatId: ${highestId}`);
  console.log(`your seatId: ${seat}`)
});
