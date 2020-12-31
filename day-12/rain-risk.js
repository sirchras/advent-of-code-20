const fs = require("fs");
// const input = fs.readFileSync("./test.txt", "utf-8")
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1)
  .map(itm => itm = {
    act: itm.substring(0, 1),
    val: Number(itm.substring(1))
  });
const DIR = {
  N: 0,
  E: 90,
  S: 180,
  W: 270
};

function turnShip(turn) {
  let directions = Object.keys(DIR);
  // can't handle L turns going counter-clockwise past N
  // need to use modulo (from mdn docs):
  // ((a % n ) + n ) % n
  let newFacing = (((DIR[facing] + turn) % 360) + 360) % 360;

  return directions.find(k => DIR[k] == newFacing);
}

function moveShip(pos, heading, dist) {
  let {x, y} = pos;

  switch(heading) {
    case "N": case "S":
      heading == "N" ? y += dist : y -= dist;
      break;
    case "E": case "W":
      heading == "E" ? x += dist : x -= dist;
      break;
  }

  return {x, y};
}

let x = 0, y = 0;
let facing = "E";

for(let i = 0; i < input.length; i++) {
  // console.log(input[i]);
  let {act, val} = input[i];
  let heading = facing;
  switch(act) {
    case "N": case "E": case "S": case "W":
      heading = act;
    case "F":
      // move in heading, val units
      ({x, y} = moveShip({x, y}, heading, val));
      // console.log(i, `moving ${heading} ${val} units to (${x}, ${y})`);
      break;
    case "L": case "R":
      // turn
      val = (act == "L" ? -val : val);
      // console.log(facing, DIR[facing], act, val);
      let newFacing = turnShip(val);
      // console.log(i, `facing ${facing} turning ${act} to face ${newFacing}-${DIR[newFacing]}`);
      facing = newFacing;
      break;
  }
}

console.log(`x: ${x}, y: ${y}`);
console.log(Math.abs(x) + Math.abs(y));
