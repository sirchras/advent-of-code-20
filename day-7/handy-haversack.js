const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity
});

let bags = {};

rl.on("line", (line) => {
  let [bag, contents] = line.split(" contain ");
  bag = bag.substring(0, bag.length-5);

  switch(contents) {
    case "no other bags.":
      contents = [];
      break;
    default:
      contents = contents.split(", ");
      contents.forEach((str, idx) => {
        contents[idx] = str.split(" ")
          .slice(1, 3)
          .join(" ");
      });
      break;
  }

  // bags[bag] = { contents: contents };
  bags[bag] = contents;
  // console.log(bags[bag]);
}).on("close", () => {
  let shinyCount = 0;
  for(bag in bags) {
    if(containShinyGoldBag(bag)) shinyCount++;
  }
  console.log(shinyCount);
  console.log("done?");
});

function containShinyGoldBag(bag) {
  // let contents = bags[bag].contents;
  let contents = bags[bag];
  if(contents.includes("shiny gold")) return true;

  for(let i = 0; i < contents.length; i++) {
    if(containShinyGoldBag(contents[i])) {
      return true;
    }
  }
  return false;
}
