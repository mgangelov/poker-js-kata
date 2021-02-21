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
const fourOfAKindHand = 'KC KS KH KD 6C';
const threeOfAKindHand = 'KC KS KH AD 6C';
const fullHouseHand = 'KC KS KH AD AC';
const straightHand = '2C 3C 4C 5D 6D';
const twoPairHand = '2C 2D 4C 4H 6D';
const onePairHand = '2C 2D AC KH 6D';
const highCardHand = 'JC 2D AC KH 6D';



console.log(checkScore(royalFlushHand));
console.log(checkScore(straightFlushHand));
console.log(checkScore(flushHand));
console.log(checkScore(fourOfAKindHand));
console.log(checkScore(threeOfAKindHand));
console.log(checkScore(fullHouseHand));
console.log(checkScore(straightHand));
console.log(checkScore(twoPairHand));
console.log(checkScore(onePairHand));
console.log(checkScore(highCardHand));
console.log(checkScore(testHand));