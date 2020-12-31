const fs = require("fs");
const input = fs.readFileSync("./test.txt", "utf-8")
// const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1)
  .map(itm => itm = {
    act: itm.substring(0, 1),
    val: Number(itm.substring(1))
  });

function createNewShip() {
  const CIR = 360;
  const DIR = { N: 0, E: 90, S: 180, W: 270 };
  let x = 0, y = 0;
  let facing = "E";

  function normalizeAngle(deg) {
    return ((deg % CIR) + CIR) % CIR;
  }

  function getNewFacing(deg) {
    let directions = Object.keys(DIR);

    return directions.find(k => DIR[k] == deg);
  }

  let ship = {
    turn: function(deg, clockwise = true) {
      // console.log("turn", deg, clockwise);
      let turn = (clockwise ? deg : -deg);
      let curAngle = DIR[this.facing()];
      let newAngle = normalizeAngle(curAngle + turn);
      facing = getNewFacing(newAngle);

      return this.facing();
    },

    move: function(dist, heading = this.facing()) {
      // console.log("move", dist, heading);
      switch(heading) {
        case "N": case "S":
          heading == "N" ? y += dist : y -= dist;
          break;
        case "E": case "W":
          heading == "E" ? x += dist : x -= dist;
          break;
      }

      return this.position();
    },

    position: function() {
      return {x, y};
    },

    facing: function() {
      return facing;
    }
  };

  return ship;
}

function embarkOnVoyage(nav, ship = createNewShip()) {
  for(let i = 0; i < nav.length; i++) {
    let {act, val} = nav[i];
    let heading;

    switch(act) {
      case "L": case "R":
        ship.turn(val, act == "R");
        break;
      case "N": case "E": case "S": case "W":
        heading = act;
      case "F":
        ship.move(val, heading);
        break;
    }
  }

  return ship;
}

// PART 1.
let ship = embarkOnVoyage(input);
let {x, y} = ship.position();

console.log(ship.position());
console.log(Math.abs(x) + Math.abs(y));
