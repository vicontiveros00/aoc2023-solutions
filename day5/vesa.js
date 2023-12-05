import { readFileSync } from "fs";

const rows = readFileSync("input.txt", "utf-8");

const [[rawSeeds], ...rawMaps] = rows
  .split("\n\n")
  .map((line) => line.split("\n"));

const parsePart1Seeds = (seeds) => {
  return seeds
    .split(" ")
    .map(Number)
    .filter((seed) => !isNaN(seed));
};

const parsePart2Seeds = (seeds) => {
  const s = seeds
    .split(" ")
    .map(Number)
    .filter((seed) => !isNaN(seed));

  let r = [];

  for (let i = 0; i < s.length; i += 2) {
    r.push([s[i], s[i] + s[i + 1]]);
  }
  return r;
};

const blocks = rawMaps.map(([_, ...values]) =>
  values.map((r) => r.split(" ").map(Number))
);

const isValueInRange =
  (value) =>
  ([_, start, range]) =>
    value >= start && value < start + range;

const part1 = Math.min(...blocks.reduce((acc, ranges) => {
  return acc.map((seed) => {
    const range = ranges.find(isValueInRange(seed));
    if (!range) return seed;
    return seed - range[1] + range[0];
  });
}, parsePart1Seeds(rawSeeds)));

let part2Seeds = parsePart2Seeds(rawSeeds);

for (let block of blocks) {
  let ranges = [];

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