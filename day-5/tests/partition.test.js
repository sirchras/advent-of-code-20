const {partition} = require("../functions.js");

const partitionTests = [
  {
    expected: true,
    actual: Array.isArray(partition(true, 0, 127)),
    message: "partition() should return an array representing a range.",
  },
  {
    expected: 2,
    actual: partition(true, 0, 127).length,
    message: "partition() should return an array with two elements representing the bounds of a range.",
  },
  {
    expected: 64,
    actual: partition(true, 0, 127)[0],
    message: "partition() should return a range with a new lower bound if the first argument is true.",
  },
  {
    expected: 63,
    actual: partition(false, 0, 127)[1],
    message: "partition() should return a range with a new higher bound if the first argument is false.",
  }
];

module.exports = partitionTests;
