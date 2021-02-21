export const getRepresentedCardValues = (values) =>
  Object.entries(values)
    .filter(([cardVal, count]) => count > 0)
    .map(([cardVal, _]) => cardVal);