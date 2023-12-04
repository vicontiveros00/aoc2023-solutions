import { readFileSync } from "fs";

const rows = readFileSync("input.txt", "utf-8");

let partOneSum = 0;
let partTwoSum = 0;
const cards: { winningNums: number[]; bettingNums: number[] }[] = [];

rows.split(/\r?\n/).forEach((row) => {
  const [winningNums, bettingNums] = row
    .split(": ")[1]
    .split(" | ")
    .map((nums) =>
      nums
        .split(" ")
        .filter(Boolean)
        .map((a) => parseInt(a.trim()))
    );

  cards.push({ winningNums, bettingNums });

  let score = bettingNums.reduce((score, num) => {
    return winningNums.includes(num) ? (score === 0 ? 1 : score * 2) : score;
  }, 0);

  partOneSum += score;
});

console.log(partOneSum);

const copies = new Map<number, number>();

for (let i = 0; i < cards.length; i++) {
  let correctAmount = cards[i].bettingNums.reduce((count, num) => {
    return count + (cards[i].winningNums.includes(num) ? 1 : 0);
  }, 0);

  let currentCopies = copies.get(i + 1) || 1;

  for (let j = 0; j < correctAmount; j++) {
    let targetIndex = i + 2 + j;
    let old = copies.get(targetIndex) || 0;
    copies.set(targetIndex, old + currentCopies);
  }
}

for (let i = 1; i <= cards.length; i++) {
  partTwoSum += copies.get(i) || 0;
}

console.log(partTwoSum);
