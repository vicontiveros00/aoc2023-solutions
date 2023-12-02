import { readFileSync } from "fs";

const red = 12;
const blue = 14;
const green = 13;

let partOneSum = 0;

let partTwoSum = 0;

const rows = readFileSync("./input.txt", "utf-8").split(/\r?\n/);

rows.forEach((row) => {
  const gameId = parseInt(row.split(": ")[0].split(" ")[1]);
  let game = row.split(": ")[1];

  let gameIsPossible = true;

  game.split("; ").forEach((cubeSet) => {
    cubeSet.split(", ").forEach((cube) => {
      const amount = parseInt(cube.split(" ")[0]);
      const color = cube.split(" ")[1];

      if (color === "red" && amount > red) {
        gameIsPossible = false;
      }
      if (color === "blue" && amount > blue) {
        gameIsPossible = false;
      }
      if (color === "green" && amount > green) {
        gameIsPossible = false;
      }
    });
  });
  if (gameIsPossible) {
    partOneSum += gameId;
  }

  let minRed = 0;
  let minBlue = 0;
  let minGreen = 0;

  game.split("; ").forEach((set) => {
    set.split(", ").forEach((cubes) => {
      const amount = parseInt(cubes.split(" ")[0]);
      const color = cubes.split(" ")[1];

      if (color === "blue" && amount > minBlue) minBlue = amount;
      if (color === "red" && amount > minRed) minRed = amount;
      if (color === "green" && amount > minGreen) minGreen = amount;
    });
  });
  partTwoSum += minBlue * minRed * minGreen;
});

console.log(partTwoSum);
