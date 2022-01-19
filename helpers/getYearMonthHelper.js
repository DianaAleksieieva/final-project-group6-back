function getYearMonthHelper(dateString) {
  const currentDate = new Date(dateString);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  return { currentYear, currentMonth, currentDate };
}

export default getYearMonthHelper;
