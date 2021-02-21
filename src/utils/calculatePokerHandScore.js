import { cardSuits, cardValues } from "./cardValuesSuits";
import {
  checkAllOfTheSameSuit,
  checkValuesForFourOfAKind,
  checkValuesForFullHouse,
  checkValuesForStraight,
  checkValuesForThreeOfAKind,
  checkValuesRoyalFlush,
  checkValuesForTwoPairs,
  checkValuesForAPair,
  checkValuesForFlush,
  checkValuesForHighCard
} from "./checks";
import * as pokerScores from "./pokerHandScores";

const parseCard = (card) => {
  return {
    value: card.split('')[0],
    suit: card.split('')[1]
  };
};

export const parsePokerHand = (pokerHandString) => {
  if (pokerHandString.split(' ').length === 5) {
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
  } else {
    console.error('Incorrect poker hand size inputted');
    process.exit(1);
  }
};

export const calculateScore = (values, suits) => {
  if (checkAllOfTheSameSuit(suits)) {
    if (checkValuesRoyalFlush(values)) {
      return {
        score: pokerScores.ROYAL_FLUSH,
        highCard: null
      };
    }
    if (checkValuesForStraight(values)) {
      // Since we know all cards are of the
      // same suit we have a straight
      // flush, rather than a regular one
      return {
        score: pokerScores.STRAIGHT_FLUSH,
        highCard: checkValuesForStraight(values)
      };
    }
    // If we only know that all cards are of
    // the same suit, then at least we have
    // a flush
    return {
      score: pokerScores.FLUSH,
      highCard: checkValuesForFlush(values)
    };
  }
  if (checkValuesForFourOfAKind(values)) {
    return {
      score: pokerScores.FOUR_OF_A_KIND,
      highCard: checkValuesForFourOfAKind(values)
    }
  }
  if (checkValuesForThreeOfAKind(values)) {
    if (checkValuesForFullHouse(values)) {
      return {
        score: pokerScores.FULL_HOUSE,
        highCard: checkValuesForFullHouse(values)
      }
    }
    return {
      score: pokerScores.THREE_OF_A_KIND,
      highCard: checkValuesForThreeOfAKind(values)
    }
  }
  if (checkValuesForStraight(values)) {
    // In this case we know that not
    // all cards are of the same suit,
    // so we only have a straight
    return {
      score: pokerScores.STRAIGHT,
      highCard: checkValuesForStraight(values)
    }
  }
  if (checkValuesForTwoPairs(values)) {
    return {
      score: pokerScores.TWO_PAIR,
      highCard: checkValuesForTwoPairs(values)
    }
  }
  if (checkValuesForAPair(values)) {
    return {
      score: pokerScores.PAIR,
      highCard: checkValuesForAPair(values)
    }
  }
  return {
    score: pokerScores.HIGH_CARD,
    highCard: checkValuesForHighCard(values)
  }
}