const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

let passports = [], idx = 0;

rl.on('line', (line) => {
  if(!passports[idx]) passports[idx] = {};
  if(line.length > 0) {
    line.split(" ").forEach(keyval => {
      [key, val] = keyval.split(":");
      passports[idx][key] = val;
    });
  } else {
    idx++;
  }
}).on('close', () => {
  let validCount = 0;
  passports.forEach(passport => {
    if(passportValid(passport)) {
      validCount++;
      // console.log("valid", passport);
    }
    // console.log(passport);
  });
  console.log(validCount);
  console.log(passports.length)
});

const ECL = /amb|blu|brn|gry|grn|hzl|oth/
function passportValid(passport) {
  return (
    checkNum(passport.byr, 1920, 2002) &&
    checkNum(passport.iyr, 2010, 2020) &&
    checkNum(passport.eyr, 2020, 2030) &&
    checkHgt(passport.hgt) &&
    checkStr(passport.hcl, /#[a-f0-9]{6}/) &&
    checkStr(passport.ecl, ECL) &&
    checkStr(passport.pid, /^[0-9]{9}$/)
  );
}

function checkNum(str, min, max) {
  let num = str && Number(str);
  if(num) {
    return min <= num && num <= max;
  }
  return false;
}

function checkHgt(hgt) {
  if(!hgt) return false;

  let regex = /(cm|in)/
  let [num, unit] = hgt.split(regex);
  switch(unit) {
    case "cm":
      return checkNum(num, 150, 193);
    case "in":
      return checkNum(num, 59, 76);
    default:
      return false;
  }
}

function checkStr(str, regex) {
  return str && Boolean(str.match(regex));
}
// NB: regexes aren't fussy abt. length
// console.log(checkStr("1234567890", /^[0-9]{9}$/))
