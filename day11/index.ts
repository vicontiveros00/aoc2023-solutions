import { readFileSync } from "fs";

const data = readFileSync("input.txt", "utf-8")
  .split(/\r?\n/)
  .map((row) => row.split(""));

const findGalaxies = (array: string[][]): { row: number; column: number }[] => {
  const galaxies: { row: number; column: number }[] = [];
  array.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === "#") {
        galaxies.push({ row: i, column: j });
      }
    });
  });
  return galaxies;
};

const calculateDistances = (array: string[][], multiplier: number): number => {
  const containsGalaxyRow = array.map((row) =>
    row.every((cell) => cell === ".")
  );
  const containsGalaxyColumn = array[0].map((_, j) =>
    array.some((row) => row[j] === "#")
  );

  const galaxies = findGalaxies(array);

  let sum = 0;
  galaxies.forEach((galaxy1, i) => {
    galaxies.slice(i + 1).forEach((galaxy2) => {
      const emptyRowsBetween = containsGalaxyRow
        .slice(galaxy1.row, galaxy2.row)
        .filter((val) => !val).length;

      const emptyColumnsBetween = containsGalaxyColumn
        .slice(
          Math.min(galaxy1.column, galaxy2.column),
          Math.max(galaxy1.column, galaxy2.column)
        )
        .filter((val) => !val).length;

      const dist =
        Math.abs(galaxy1.row - galaxy2.row) +
        Math.abs(galaxy1.column - galaxy2.column) +
        (emptyColumnsBetween + emptyRowsBetween) * (multiplier - 1);

      sum += dist;
    });
  });

  return sum;
};

console.log(calculateDistances(data, 2));
console.log(calculateDistances(data, 1000000));
