// this is literally impossible, tried taking inspiration from vesa's solution but there's so much type inferring going on that this works in js

import { readFileSync } from "fs";

const rows: string = readFileSync("input.txt", "utf8");

const [[rawSeeds], ...rawMaps]: number[][] = rows
  .split("\n\n")
  .map((line) => line.split("\n").map(Number));

const parsePart1Seeds = (seeds: string): number[] => {
  return seeds
    .split(" ")
    .map(Number)
    .filter((seed) => !isNaN(seed));
};

const parsePart2Seeds = (seeds: string): number[][] => {
  const s = seeds
    .split(" ")
    .map(Number)
    .filter((seed) => !isNaN(seed));

  let r: number[][] = [];

  for (let i = 0; i < s.length; i += 2) {
    r.push([s[i], s[i] + s[i + 1]]);
  }
  return r;
};

const isValueInRange = (seed: number) => (range: number[]) => {
  const overlapStart = Math.max(seed, range[1]);
  const overlapEnd = Math.min(seed, range[1] + range[2]);
  return overlapStart < overlapEnd;
};

const blocks: number[][] = rawMaps.map(([_, ...values]) =>
  values.map((r) => String(r).split(" ").map(Number))
);

const isValueInRangeSeed = (seed: number[]) => (range: number[]) => {
  const overlapStart = Math.max(seed[0], range[1]);
  const overlapEnd = Math.min(seed[1], range[1] + range[2]);
  return overlapStart < overlapEnd;
};

const part1 = Math.min(
  ...blocks.reduce((acc, ranges) => {
    return acc.map((seed) => {
      const range = ranges.find(isValueInRangeSeed(seed));
      if (!range) return seed;
      return seed - range[0] + range[1];
    });
  }, parsePart1Seeds(rawSeeds))
);

let part2Seeds: number[][] = parsePart2Seeds(rawSeeds);

for (let block of blocks) {
  let ranges: number[][] = [];

  for (let i = 0; i < part2Seeds.length; i++) {
    const seed = part2Seeds[i];
    let rangeMatch = false;
    for (let range of block) {
      const overlapStart = Math.max(seed[0], range[1]);
      const overlapEnd = Math.min(seed[1], range[1] + range[2]);
      if (overlapStart < overlapEnd) {
        rangeMatch = true;
        ranges.push([
          overlapStart - range[1] + range[0],
          overlapEnd - range[1] + range[0],
        ]);
        if (overlapStart > seed[0]) part2Seeds.push([seed[0], overlapStart]);
        if (overlapEnd < seed[1]) part2Seeds.push([overlapEnd, seed[1]]);
        break;
      }
    }
    if (!rangeMatch) {
      ranges.push(seed);
    }
  }
  part2Seeds = ranges;
}

const part2 = Math.min(...part2Seeds.map((i) => i[0]));

console.log("Part 1:", part1);
console.log("Part 2:", part2);
