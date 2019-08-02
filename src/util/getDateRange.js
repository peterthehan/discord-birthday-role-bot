module.exports = currentDate => {
  const previousDate = new Date(currentDate.getTime());
  previousDate.setDate(previousDate.getDate() - 1);

  const nextDate = new Date(currentDate.getTime());
  nextDate.setDate(nextDate.getDate() + 1);

  return [previousDate, currentDate, nextDate];
};
