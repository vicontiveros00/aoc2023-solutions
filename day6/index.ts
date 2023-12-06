import { readFileSync } from "fs";

const data: number[][] = [];
let partOneResult = 1;

readFileSync("input.txt", "utf-8")
  .split(/\r?\n/)
  .forEach(function (line) {
    const values = line
      .split(": ")[1]
      .split(" ")
      .filter((a) => a)
      .map((a) => parseInt(a.trim()));
    data.push(values);
  });

for (let i = 0; i < data[0].length; i++) {
  let time = data[0][i];
  let distance = data[1][i];
  let wins = 0;
  for (let k = 0; k <= time; k++) {
    let testDist = k * (time - k);
    if (testDist > distance) {
      wins++;
    }
  }
  partOneResult *= wins;
}

let time = 0;
data[0].forEach((a: number) => (time += a));
let distance = 0;
data[1].forEach((a: number) => (distance += a));
let waysToWin = 0;
for (let k = 0; k <= time; k++) {
  let testDist = k * (time - k);
  if (testDist > distance) {
    waysToWin++;
  }
}

console.log(partOneResult);
console.log(waysToWin);
