export const callNumDays = (before, after) => {
    const timeDifference = after - before;
  
    return timeDifference / (1000 * 60 * 60 * 24);
  };