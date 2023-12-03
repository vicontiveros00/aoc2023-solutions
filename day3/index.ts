import { readFileSync } from "fs";

const rowData: string[][] = [];
const partNumberInfo: {
  number: number;
  row: number;
  begin: number;
  end: number;
}[] = [];
let counter = 0;
const gears: { row: number; col: number; adjNums: Set<unknown> }[] = [];
let partOneSum = 0;
let partTwoSum = 0;
const rows = readFileSync("input.txt", "utf-8");

rows.split(/\r?\n/).forEach((line, rowIndex) => {
  let row = line.split("");
  let numBegin = -1;
  let num = "";
  row.forEach((char, colIndex) => {
    if (!isNaN(Number(char))) {
      if (numBegin === -1) {
        numBegin = colIndex;
      }
      num += char;
    } else {
      if (numBegin !== -1) {
        partNumberInfo.push({
          number: parseInt(num),
          row: rowIndex,
          begin: numBegin,
          end: colIndex - 1,
        });
        numBegin = -1;
        num = "";
      }
    }
    if (
      colIndex === row.length - 1 &&
      numBegin !== -1 &&
      !isNaN(Number(char))
    ) {
      partNumberInfo.push({
        number: parseInt(num),
        row: rowIndex,
        begin: numBegin,
        end: colIndex - 1,
      });
      numBegin = -1;
      num = "";
    }
  });
  counter++;
  rowData.push(row);
});

partNumberInfo.forEach((num) => {
  const points = [];
  for (let i = num.row - 1; i <= num.row + 1; i++) {
    for (let j = num.begin - 1; j <= num.end + 1; j++) {
      if (i >= 0 && i < rowData.length && j >= 0 && j < rowData[0].length) {
        points.push({ row: i, col: j });
      }
    }
  }
  let isPart = false;
  points.forEach((point) => {
    if (
      isNaN(Number(rowData[point.row][point.col])) &&
      rowData[point.row][point.col] !== "."
    ) {
      isPart = true;
      return;
    }
  });
  if (isPart) {
    partOneSum += num.number;
  }
});
console.log(partOneSum);

rows.split(/\r?\n/).forEach((line, rowIndex) => {
  let row = line.split("");
  row.forEach((char, colIndex) => {
    if (char === "*") {
      gears.push({ row: rowIndex, col: colIndex, adjNums: new Set() });
    }
  });
});

gears.forEach((gear) => {
  const adjacent: number[] = [];
  partNumberInfo.forEach((number) => {
    if (
      number.row >= gear.row - 1 &&
      number.row <= gear.row + 1 &&
      gear.col >= number.begin - 1 &&
      gear.col <= number.end + 1
    ) {
      adjacent.push(number.number);
    }
  });
  if (adjacent.length === 2) {
    partTwoSum += adjacent[0] * adjacent[1];
  }
});

console.log(partTwoSum);
