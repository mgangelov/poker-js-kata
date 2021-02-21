import { values } from "regenerator-runtime";
import { calculateScore, parsePokerHand } from "./utils/calculatePokerHandScore";
import { getRepresentedCardValues } from "./utils/helpers";
import * as pokerScores from "./utils/pokerHandScores";

const findScoreString = (score) => {
  const pairs = Object.entries(pokerScores);
  return pairs.filter(([str, val]) => val === score)[0][0];
};

const checkScore = (handString) => {
  const { values, suits } = parsePokerHand(handString);
  const score = calculateScore(values, suits);
  return findScoreString(score);
};

const testHand = 'AC 4S 5S 8C AH';
const royalFlushHand = 'AC TC KC JC QC';
const straightFlushHand = '2C 3C 4C 5C 6C';
const flushHand = '2C TC JC 5C 6C';

console.log(checkScore(royalFlushHand));
console.log(checkScore(straightFlushHand));
console.log(checkScore(flushHand));