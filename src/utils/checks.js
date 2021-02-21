import * as _ from 'lodash';
import { getRepresentedCardValues } from "./helpers";

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

  return valuesSet.size === royalFlushValuesSet.size &&
    [...valuesSet].every(value => royalFlushValuesSet.has(value));
};

// To determine straight flush (or any card value sequence for that matter)
// it's easier to convert the values object into a string
// and to look for the index of a specific condition,
// if it exists in the array.
const straightFlushCondition = '11111';
export const checkValuesForStraight = (values) => {
  const cardValuesString = Object.values(values).join('');
  return cardValuesString.indexOf(straightFlushCondition) !== -1;
};

// For two, three or four of a kind it's enough that we have a count of
// 2, 3 or 4 respectively in any of the object properties keeping track of the
// card values. We can also generalise the function to
// search for 2 pairs by having a requirement of how many
// occurrences of a predicate we have
const checkValuesForSomeOfAKind = (
  values,
  requiredCount,
  requiredLength = 0
) =>
  Object.entries(values)
    .filter(([cardValue, count]) => count === requiredCount)
    .length > requiredLength;

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
  return threeOfAKind.length > 0 &&
    checkValuesForAPair(values);
};

