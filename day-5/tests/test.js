const {assert} = require("./util.js");

const partitionTests = require("./partition.test.js");
const scanBPTests = require("./scanBP.test.js");
const tests = partitionTests.concat(scanBPTests);

function runTests() {
  for(let i = 0; i < tests.length; i++) {
    let test = tests[i];

    try {
      assert.equal(test.expected, test.actual);

      // console.log(`test ${i+1}: ${test.message}\nPASS`);
    } catch(err) {
      console.log(`test ${i+1}: ${test.message}`);
      // console.log(`Expect ${test.expected} to equal ${test.actual}.`);
      console.error(err.message);
      throw new Error("Tests failing");
    }
  }
}

module.exports = runTests;
