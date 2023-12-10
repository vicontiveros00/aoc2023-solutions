import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8");

type Point = [number, number];

const pointEq = (a: Point, b: Point): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};

const pointAdd = (a: Point, b: Point): Point => {
  return [a[0] + b[0], a[1] + b[1]];
};

const pointInBounds = (grid: string[][], [x, y]: Point): boolean => {
  return x >= 0 && y >= 0 && y < grid.length && x < grid[0].length;
};

const getCell = (grid: string[][], [x, y]: Point): string => {
  return grid[y]?.[x] ?? "";
};

const parse = (
  input: string
): {
  grid: string[][];
  start: Point;
} => {
  let start: Point = [0, 0];
  const grid = input
    .trim()
    .split("\n")
    .map((line, y) => {
      const row = line.split("");
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "S") start = [x, y];
      }
      return row;
    });
  return { grid, start };
};

/* const traverse = async (
  grid: string[][],
  start: Point,
  prev: Point = [-1, -1]
): Promise<Generator<Point>> => {
  let loc = start as Point;
  do {
    for (const next of connectingNeighbors(grid, loc)) {
      if (prev && pointEq(prev, next)) continue;
      const cell = grid[next[1]][next[0]];
      if (cell !== ".") {
        yield next;
        prev = loc;
        loc = next;
        break;
      }
    }
  } while (!pointEq(loc, start));
}; */

const connectSouth = ["|", "7", "F"];
const connectNorth = ["|", "J", "L"];
const connectWest = ["-", "7", "J"];
const connectEast = ["-", "F", "L"];

function* connectingNeighbors(
  grid: string[][],
  start: Point
): Generator<Point> {
  const north: Point = [0, -1];
  const south: Point = [0, 1];
  const west: Point = [-1, 0];
  const east: Point = [1, 0];
  const cell = getCell(grid, start);

  let deltas: Point[];
  switch (cell) {
    case "|":
      deltas = [north, south];
      break;
    case "-":
      deltas = [west, east];
      break;
    case "L":
      deltas = [north, east];
      break;
    case "J":
      deltas = [north, west];
      break;
    case "7":
      deltas = [south, west];
      break;
    case "F":
      deltas = [south, east];
      break;
    default:
      throw new Error(`unexpected cell "${cell}" at ${start}`);
  }
  for (const [dx, dy] of deltas) {
    const neighbor: Point = [start[0] + dx, start[1] + dy];
    if (pointInBounds(grid, neighbor)) {
      yield neighbor;
    }
  }
}

function part1(input: string): number {
  const { grid, start } = parse(input);
  grid[start[1]][start[0]] = solveJunction(grid, start)!;
  let steps = 0;
  for (const _ of traverse(grid, start)) steps++;
  return Math.floor(steps / 2);
}

function solveJunction(grid: string[][], start: Point): string | null {
  const north = pointAdd(start, [0, -1]);
  const south = pointAdd(start, [0, 1]);
  const west = pointAdd(start, [-1, 0]);
  const east = pointAdd(start, [1, 0]);
  if (
    connectEast.includes(getCell(grid, west)) &&
    connectWest.includes(getCell(grid, east))
  )
    return "-";
  if (
    connectSouth.includes(getCell(grid, north)) &&
    connectNorth.includes(getCell(grid, south))
  )
    return "|";
  if (
    connectWest.includes(getCell(grid, east)) &&
    connectNorth.includes(getCell(grid, south))
  )
    return "F";
  if (
    connectEast.includes(getCell(grid, west)) &&
    connectNorth.includes(getCell(grid, south))
  )
    return "7";
  if (
    connectEast.includes(getCell(grid, west)) &&
    connectSouth.includes(getCell(grid, north))
  )
    return "J";
  if (
    connectWest.includes(getCell(grid, east)) &&
    connectSouth.includes(getCell(grid, north))
  )
    return "L";
  if (
    connectEast.includes(getCell(grid, west)) &&
    connectSouth.includes(getCell(grid, north))
  )
    return "J";
  return null;
}

console.log(part1(input));
