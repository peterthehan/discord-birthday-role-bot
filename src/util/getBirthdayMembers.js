const getDateRange = currentDate => {
  const previousDate = new Date(currentDate.getTime());
  previousDate.setDate(previousDate.getDate() - 1);

  const nextDate = new Date(currentDate.getTime());
  nextDate.setDate(nextDate.getDate() + 1);

  return [previousDate, currentDate, nextDate];
};

const toUTCMonthDate = date => `${date.getUTCMonth()}${date.getUTCDate()}`;

module.exports = (members, getDateCallback) => {
  const currentDate = new Date();
  const currentMonthDateRange = getDateRange(currentDate).map(toUTCMonthDate);

  return members
    .filter(member => !member.user.bot)
    .filter(member => {
      const date = getDateCallback(member);
      return (
        date &&
        date.getUTCFullYear() !== currentDate.getUTCFullYear() &&
        currentMonthDateRange.includes(toUTCMonthDate(date))
      );
    });
};
