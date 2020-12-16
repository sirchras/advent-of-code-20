const round = Math.round;

function partition(upper, lo, hi) {
  let d = round((hi - lo) / 2);
  (upper ? lo += d : hi -= d);
  return [lo, hi];
}

function scanBoardingPass(pass) {
  let rLo = 0, rHi = 127;
  let cLo = 0, cHi = 7;
  for(let i = 0; i < pass.length; i++) {
    switch(pass[i]) {
      case "F": case "B":
        [rLo, rHi] = partition(pass[i] == "B", rLo, rHi);
        break;
      case "L": case "R":
        [cLo, cHi] = partition(pass[i] == "R", cLo, cHi);
        break;
    }
  }
  return {row: [rLo, rHi], col: [cLo, cHi]};
}

module.exports = {
  partition,
  scanBoardingPass,
};