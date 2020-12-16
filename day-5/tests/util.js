let assert = {
  equal: function(first, second) {
    if(first !== second) {
      throw new Error(`Assert failed, ${first} is not equal to ${second}.`);
    }
  }
}

module.exports = {
  assert,
};