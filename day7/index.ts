import { readFileSync } from "fs";

interface Game {
  hand: string;
  bet: number;
}

interface Card {
  card: string;
  amount: number;
}

const cardMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const readDataFromFile = (filename: string): Game[] => {
  const data: Game[] = [];
  readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .forEach((line) => {
      const [hand, bet] = line.split(" ");
      data.push({ hand, bet: parseInt(bet) });
    });
  return data;
};

const getCards = (hand: string): Card[] => {
  return Object.keys(cardMap)
    .map((card) => ({ card, amount: hand.split(card).length - 1 }))
    .sort((a, b) => b.amount - a.amount);
};

const getGameResult = (cards: Card[]): number => {
  const [first, second] = cards;
  if (first.amount === 5) return 7;
  if (first.amount === 4) return 6;
  if (first.amount === 3 && second.amount === 2) return 5;
  if (first.amount === 3) return 4;
  if (first.amount === 2 && second.amount === 2) return 3;
  if (first.amount === 2) return 2;
  return 1;
};

const calculateResult = (
  data: Game[],
  cardMap: Record<string, number>
): number => {
  let result = 0;
  let results: { game: Game; result: number }[] = [];

  data.forEach((game) => {
    const cards = getCards(game.hand);
    results.push({ game, result: getGameResult(cards) });
  });

  const sorted = results.sort((a, b) => {
    if (a.result !== b.result) return a.result - b.result;

    for (let i = 0; i < 5; i++) {
      const cardA = cardMap[a.game.hand.charAt(i) as keyof typeof cardMap];
      const cardB = cardMap[b.game.hand.charAt(i) as keyof typeof cardMap];

      if (cardA > cardB) return 1;
      if (cardA < cardB) return -1;
    }
    return 0;
  });

  for (let i = 0; i < sorted.length; i++) {
    result += (i + 1) * sorted[i].game.bet;
  }

  return result;
};

const data = readDataFromFile("input.txt");
let partOneResult = calculateResult(data, cardMap);
console.log(partOneResult);

cardMap["J"] = 0;
let partTwoResult = calculateResult(data, cardMap);
console.log(partTwoResult);
