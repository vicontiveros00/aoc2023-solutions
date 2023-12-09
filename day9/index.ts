import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8");

let partOneResult: number;
let partTwoResult: number;

const histories = input.split(/\n/g).map((line) => line.split(" ").map(Number));
const aperture = (num: number, arr: any[]) =>
  arr
    .reduce((acc, _, i) => [...acc, arr.slice(i, i + num)], [])
    .filter((item: string | any[]) => item.length === num);
const solve =
  (forwards: boolean) =>
  (arr: any[]): number => {
    if (arr.every((i: number) => i === 0)) return 0;
    const deltas = aperture(2, arr).map(([a, b]: [number, number]) => b - a);
    const diff = solve(forwards)(deltas);
    return forwards ? arr[arr.length - 1] + diff : arr[0] - diff;
  };
partOneResult = histories
  .map(solve(true))
  .reduce((a: number, b: number) => a + b, 0);
partTwoResult = histories
  .map(solve(false))
  .reduce((a: number, b: number) => a + b, 0);

console.log(partOneResult);
console.log(partTwoResult);
