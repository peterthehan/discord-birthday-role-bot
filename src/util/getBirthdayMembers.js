const getDateRange = require('./getDateRange');
const toUTCMonthDate = require('./toUTCMonthDate');
const toUTCYearMonthDate = require('./toUTCYearMonthDate');

module.exports = (members, getDateCallback) => {
  const currentDate = new Date();
  const currentDateRange = getDateRange(currentDate);
  const monthDateRange = currentDateRange.map(toUTCMonthDate);
  const yearMonthDateRange = currentDateRange.map(toUTCYearMonthDate);

  return members
    .filter(member => !member.user.bot)
    .filter(member => {
      const date = getDateCallback(member);
      return (
        date &&
        !yearMonthDateRange.includes(toUTCYearMonthDate(date)) &&
        monthDateRange.includes(toUTCMonthDate(date))
      );
    });
};
