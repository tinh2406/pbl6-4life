export const calcNumDays = (before, after) => {
  const timeDifference = after - before;
  return (timeDifference / (1000 * 60 * 60 * 24)).toFixed(0);
};
