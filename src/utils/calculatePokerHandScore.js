import { cardSuits, cardValues } from "./cardValuesSuits";
import { checkAllOfTheSameSuit, checkValuesForStraightFlush, checkValuesRoyalFlush } from "./checks";
import * as pokerScores from "./pokerHandScores";

const parseCard = (card) => {
  return {
    value: card.split('')[0],
    suit: card.split('')[1]
  };
};

export const parsePokerHand = (pokerHandString) => {
  // TODO: CHECK IF POKER HAND HAS 5 cards
  const hand = {
    cards: [],
    values: cardValues,
    suits: cardSuits
  };
  pokerHandString
    .split(' ')
    .map(parseCard)
    .forEach(card => {
      hand.cards.push(card);
      hand.values[card.value] += 1;
      hand.suits[card.suit] += 1;
    });

    return hand;
};

export const calculateScore = (values, suits) => {
  if (checkAllOfTheSameSuit) {
    if (checkValuesRoyalFlush(values)) {
      return pokerScores.ROYAL_FLUSH;
    }
    if (checkValuesForStraightFlush(values)) {
      return pokerScores.STRAIGHT_FLUSH;
    }
    return pokerScores.FLUSH;
  }
}