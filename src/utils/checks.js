import * as _ from 'lodash';
import { getRepresentedCardValues } from "./helpers";

const findHighestCard = (values, requiredCount = 1) => {
  const cardValuesString = Object.values(values).join('');
  // Return card at the final index which contains a card
  // occurrence
  return Object.entries(values)[
    _.findLastIndex(
      cardValuesString, 
      cardValCount => cardValCount === (requiredCount + '')
    )
  ][0];
}

export const checkAllOfTheSameSuit = (suits) =>
  Object.entries(suits)
    .filter(([suit, count]) => count === 5).length > 0;

// Checking whether the represented card values
// within a hand matches the strict case of royalFlushValuesSet.
// Using sets is a extra guarantee that we have no duplicates
// across the card value arrays
const royalFlushValuesSet = new Set(
  ['A', 'J', 'K', 'Q', 'T']
);
export const checkValuesRoyalFlush = (values) => {
  const availableValues = getRepresentedCardValues(values);
  const valuesSet = new Set(availableValues);

  if (valuesSet.size === royalFlushValuesSet.size &&
    [...valuesSet].every(value => royalFlushValuesSet.has(value))) {
      // The highest card in royal flush is always A
      return 'A';
    };
};

// To determine straight flush (or any card value sequence for that matter)
// it's easier to convert the values object into a string
// and to look for the index of a specific condition,
// if it exists in the array.
const straightFlushStandardCondition = '11111';
// Special case where Ace is the lowest card in the straight flush
const straightFlushSpecialCondition = '1111000000001';
export const checkValuesForStraight = (values) => {
  const cardValuesEntries = Object.entries(values);
  const cardValuesString = Object.values(values).join('');
  const straightFlushStandardConditionIndex =
    cardValuesString.indexOf(straightFlushStandardCondition);
  const straightFlushSpecialConditionIndex =
    cardValuesString.indexOf(straightFlushSpecialCondition);
  if (straightFlushStandardConditionIndex !== -1) {
    // In the standard case the highest card is always the one within
    // 4 places of the sequence occurrence
    const highCard = cardValuesEntries[
      straightFlushStandardConditionIndex + 4
    ];
    return highCard[0];
  }
  if (straightFlushSpecialConditionIndex !== -1) {
      // In this case the highest value is always the card value of 4
      return cardValuesEntries[3][0];
  }
};

// The easiest way to find the highest card for a flush
// would be to convert card values to string and find
// biggest corresponding card value to the highest indexOf
// of 1
export const checkValuesForFlush = (values) => {
  return findHighestCard(values);
}

// For two, three or four of a kind it's enough that we have a count of
// 2, 3 or 4 respectively in any of the object properties keeping track of the
// card values. We can also generalise the function to
// search for 2 pairs by having a requirement of how many
// occurrences of a predicate we have
const checkValuesForSomeOfAKind = (
  values,
  requiredCount,
  requiredLength = 0
) => {
  const condition =
    Object.entries(values)
      .filter(([cardValue, count]) => count === requiredCount)
      .length > requiredLength;
  if (condition) {
    return findHighestCard(values, requiredCount);
    }

}

export const checkValuesForFourOfAKind = (values) =>
  checkValuesForSomeOfAKind(values, 4);

export const checkValuesForThreeOfAKind = (values) =>
  checkValuesForSomeOfAKind(values, 3);

export const checkValuesForTwoPairs = (values) =>
  checkValuesForSomeOfAKind(values, 2, 1);

export const checkValuesForAPair = (values) =>
  checkValuesForSomeOfAKind(values, 2);

export const checkValuesForFullHouse = (values) => {
  const valueEntries = Object.entries(values);
  const [threeOfAKind, restCardValues] = _.partition(
    valueEntries,
    (([cardValue, count]) => count === 3)
  );
  // We can reuse our previous functions to check
  // whether we have a pair in the remaining cards
  // (after we have removed the three of a kind)
  if (
    threeOfAKind.length > 0 &&
    checkValuesForAPair(values)
  ) {
      // In full house the highest card is the one
      // part of the 3 of a kind
      return findHighestCard(values, 3);
    }
};

export const checkValuesForHighCard = (values) => {
  return findHighestCard(values);
}

