const getLastHalfYearArrayHelper = () => {
  const now = new Date();
  let year = now.getYear() + 1900;
  let month = now.getMonth() + 1;
  const lastMonthsArray = [];
  for (let i = 0; i < 6; i++) {
    if (month < 1) {
      month = 12;
      year = parseInt(year) - 1;
    }
    lastMonthsArray.unshift({ year, month: month--, count: 0, sum: 0 });
  }

  return { lastMonthsArray, currentYear: now.getYear() + 1900 };
};
export default getLastHalfYearArrayHelper;
