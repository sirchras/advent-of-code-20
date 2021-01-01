const fs = require("fs");
// const input = fs.readFileSync("./test.txt", "utf-8")
const input = fs.readFileSync("./input.txt", "utf-8")
  .split("\n").slice(0, -1)
  .map(itm => itm = {
    act: itm.substring(0, 1),
    val: Number(itm.substring(1))
  });
const sin = Math.sin, cos = Math.cos, round = Math.round;

function createNewShip(waypoint = {x: 1, y: 0}) {
  const DIR = {
    N: {x: 0, y: 1},
    E: {x: 1, y: 0},
    S: {x: 0, y: -1},
    W: {x: -1, y: 0}
  };
  let x = 0, y = 0;

  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  let ship = {
    turn: function(deg, clockwise = true) {
      // console.log("turn", deg, clockwise);
      let rot = degToRad((clockwise ? deg : -deg));
      let x = waypoint.x, y = waypoint.y;
      let s = round(sin(rot)), c = round(cos(rot));

      waypoint.x = ((x * c) + 0) + ((y * s) + 0);
      waypoint.y = ((x * -s) + 0) + ((y * c) + 0);

      return this.waypoint();
    },

    move: function(dist, heading) {
      // console.log("move", dist, heading);
      let waypoint = heading ? DIR[heading] :
        this.waypoint();

      x += (dist * waypoint.x);
      y += (dist * waypoint.y);

      return this.position();
    },

    position: function() {
      return {x, y};
    },

    waypoint: function() {
      return waypoint;
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

// console.log(ship.position());
console.log("PART 1.", Math.abs(x) + Math.abs(y));
