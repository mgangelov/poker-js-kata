import { cardSuits, cardValues } from "./cardValuesSuits";
import {
  checkAllOfTheSameSuit,
  checkValuesForFourOfAKind,
  checkValuesForFullHouse,
  checkValuesForStraight,
  checkValuesForThreeOfAKind,
  checkValuesRoyalFlush,
  checkValuesForTwoPairs,
  checkValuesForAPair
} from "./checks";
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
    values: {...cardValues},
    suits: {...cardSuits}
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
  if (checkAllOfTheSameSuit(suits)) {
    if (checkValuesRoyalFlush(values)) {
      return pokerScores.ROYAL_FLUSH;
    }
    if (checkValuesForStraight(values)) {
      // Since we know all cards are of the
      // same suit we have a straight
      // flush, rather than a regular one
      return pokerScores.STRAIGHT_FLUSH;
    }
    // If we only know that all cards are of
    // the same suit, then at least we have
    // a flush
    return pokerScores.FLUSH;
  }
  if (checkValuesForFourOfAKind(values)) {
    return pokerScores.FOUR_OF_A_KIND;
  }
  if (checkValuesForThreeOfAKind(values)) {
    if (checkValuesForFullHouse(values)) {
      return pokerScores.FULL_HOUSE;
    }
    return pokerScores.THREE_OF_A_KIND;
  }
  if (checkValuesForStraight(values)) {
    // In this case we know that not
    // all cards are of the same suit,
    // so we only have a straight
    return pokerScores.STRAIGHT;
  }
  if (checkValuesForTwoPairs(values)) {
    return pokerScores.TWO_PAIR;
  }
  if (checkValuesForAPair(values)) {
    return pokerScores.PAIR;
  }
  return pokerScores.HIGH_CARD;
}