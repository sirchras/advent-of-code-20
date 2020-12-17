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
  contents = parseContents(contents);

  bags[bag] = contents;
}).on("close", () => {
  let shinyCount = 0;

  for(bag in bags) {
    if(containShinyGoldBag(bag)) shinyCount++;
  }

  console.log(shinyCount);
  console.log(countBagContents());
});

function parseContents(contentStr) {
  let contents = {};

  switch(contentStr) {
    case "no other bags.":
      break;
    default:
      contentStr.split(", ")
        .forEach((str, idx) => {
          let arr = str.split(" ");
          let bag = arr.slice(1, 3)
            .join(" ");
          let num = Number(arr[0]);
          contents[bag] = num;
        });
      break;
  }

  return contents;
}

function containShinyGoldBag(bag) {
  let contents = Object.keys(bags[bag]);
  if(contents.includes("shiny gold")) return true;

  for(let i = 0; i < contents.length; i++) {
    if(containShinyGoldBag(contents[i])) {
      return true;
    }
  }
  return false;
}

function countBagContents(bagName = "shiny gold") {
  let bag = bags[bagName];
  if(Object.keys(bag).length == 0) return 0;

  let contentCount = 0;
  for(innerBag in bag) {
    let num = bag[innerBag];
    contentCount += num + (num * countBagContents(innerBag));
  }
  return contentCount;
}
