import { readFileSync } from "fs";

const rows = readFileSync("input.txt", "utf-8").split(/\r?\n/);

let partOneSum = 0;

rows.forEach((row) => {
  const matchFound = row.match(new RegExp(/\d+/g))?.toString();
  if (matchFound) {
    partOneSum += Number(matchFound![0] + matchFound![matchFound!.length - 1]);
  }
});

console.log(partOneSum);

let partTwoSum = 0;

const numToString = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const processLine = (row: string): Array<string> => {
  const digits = [];
  let isFirstDigit = true;
  let isLastDigit = false;

  while (isFirstDigit) {
    const matchFound = row.match(
      new RegExp(/^(one|two|three|four|five|six|seven|eight|nine|\d)/)
    );
    if (!matchFound) {
      row = row.substring(1);
    } else {
      digits.push(
        numToString[matchFound![0] as keyof typeof numToString] ??
          matchFound![0]
      );
      isLastDigit = true;
      break;
    }
  }

  while (isLastDigit) {
    const matchFound = row.match(
      new RegExp(/(one|two|three|four|five|six|seven|eight|nine|\d)$/)
    );
    if (!matchFound) {
      row = row.substring(0, row.length - 1);
    } else {
      digits.push(
        numToString[matchFound![0] as keyof typeof numToString] ??
          matchFound![0]
      );
      break;
    }
  }

  isFirstDigit = false;
  isLastDigit = false;

  return digits;
};

rows.forEach((row) => {
  const numbers = processLine(row);
  partTwoSum += Number(numbers[0] + numbers[1]);
});

console.log(partTwoSum);
