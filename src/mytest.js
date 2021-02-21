import { values } from "regenerator-runtime";
import PokerHand from "./PokerHand";
import { calculateScore, parsePokerHand } from "./utils/calculatePokerHandScore";
import { getRepresentedCardValues } from "./utils/helpers";
import * as pokerScores from "./utils/pokerHandScores";

const findScoreString = (score) => {
  const pairs = Object.entries(pokerScores);
  return pairs.filter(([str, val]) => val === score)[0][0];
};

const checkScore = (handString) => {
  const { values, suits } = parsePokerHand(handString);
  const { score, highCard } = calculateScore(values, suits);
  console.log('HIGH CARD IS ', highCard);
  return findScoreString(score);
};

const testHand = 'AC 4S 5S 8C AH';
const royalFlushHand = 'AC TC KC JC QC';
const straightFlushHand = '2C 3C 4C 5C 6C';
const flushHand = '2C TC JC 5C 6C';
const fourOfAKindHand = 'KC KS KH KD 6C';
const threeOfAKindHand = 'KC KS KH AD 6C';
const fullHouseHand = '2C 2S 2H AD AC';
const straightHand = '2C 3C 4C 5D 6D';
const twoPairHand = '7C 2D 7C 2H 6D';
const onePairHand = '2C 2D AC KH 6D';
const highCardHand = 'JC 2D AC KH 6D';
const highCardHand2 = 'JC 2D TC KH 6D';
const testHand1 = '2H 3D 5S 9C KD';
const testHand2 = '2C 3H 4S 8C AH';
const testHand3 = '2H 4S 4C 2D 4H';
const testHand4 = '2S 8S AS QS 3S';
const testHand5 = '2H 3D 5S 9C KD';
const testHand6 = '2C 3H 4S 8C KH';
const testHand7 = '2H 3D 5S 9C KD';
const testHand8 = '2D 3H 5C 9S KH';


console.log('\nCOMBINATION SCENARIOS');
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
console.log(checkScore(highCardHand2));

console.log('\nRANDOM TEST SCENARIOS');
// console.log(checkScore(testHand));
// console.log(checkScore(testHand1));
// console.log(checkScore(testHand2));
// console.log(checkScore(testHand3));
// console.log(checkScore(testHand4));
// console.log(checkScore(testHand5));
// console.log(checkScore(testHand6));
// console.log(checkScore(testHand7));
// console.log(checkScore(testHand8));

console.log('\nPOKER HAND OBJECTS');
const hand1 = new PokerHand('AC 4S 5S 8C AH');
console.log('HAND 1 SUITS', hand1.suits);
console.log('HAND 1 VALUES', hand1.suits);
console.log('HAND 1 SCORE', hand1.handScore);