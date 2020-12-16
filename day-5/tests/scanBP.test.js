const {scanBoardingPass} = require("../functions.js");

test1 = scanBoardingPass("FBFBBFFRLR");
const scanBPTests = [
  {
    expected: true,
    actual: test1.row[0] == test1.row[1],
    message: "scanBoardingPass() should return a range representing the seat row which consists of a single number each after scanning a complete boarding pass.",
  },
  {
    expected: true,
    actual: test1.col[0] == test1.col[1],
    message: "scanBoardingPass() should return a range representing the seat column which consists of a single number each after scanning a complete boarding pass."
  },
  {
    expected: 44,
    actual: test1.row[0],
    message: "",
  },
  {
    expected: 5,
    actual: test1.col[0],
    message: "",
  }
]

module.exports = scanBPTests;