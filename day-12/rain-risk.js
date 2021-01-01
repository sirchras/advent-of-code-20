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

    chart: function(dist, heading) {
      // console.log("chart", dist, heading);
      let dir = DIR[heading];
      let x = waypoint.x, y = waypoint.y;

      waypoint.x = (x + (dir.x * dist));
      waypoint.y = (y + (dir.y * dist));

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

function embarkOnVoyage(ins, nav, ship = createNewShip()) {
  for(let i = 0; i < ins.length; i++) {
    let {act, val} = ins[i];

    nav(ship, act, val);
  }

  return ship;
}


// PART 1.
function navigateOne(ship, act, val) {
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

let ship = embarkOnVoyage(input, navigateOne);
let {x, y} = ship.position();

// console.log(ship.position());
console.log("PART 1.", Math.abs(x) + Math.abs(y));


// PART 2.
function navigateTwo(ship, act, val) {
  switch(act) {
    case "L": case "R":
      ship.turn(val, act == "R");
      break;
    case "N": case "E": case "S": case "W":
      ship.chart(val, act);
      break;
    case "F":
      ship.move(val);
      break;
  }
}

ship = createNewShip({x: 10, y: 1});
ship = embarkOnVoyage(input, navigateTwo, ship);
({x, y} = ship.position());

// console.log(ship.position());
console.log("PART 2.", Math.abs(x) + Math.abs(y));
