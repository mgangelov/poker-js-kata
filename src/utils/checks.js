import { getRepresentedCardValues } from "./helpers";

export const checkAllOfTheSameSuit = (suits) =>
  suits.filter(suit => suit === 5).length > 0;

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
export const checkValuesForStraightFlush = (values) => {
  const cardValuesString = Object.values(values).join('');
  return cardValuesString.indexOf(straightFlushCondition) !== -1;
};
