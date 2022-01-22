function countYearlyByTypeHelper(transactions) {
  const yearArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let sum = 0;
  let result = [];
  transactions.map(transaction => {
    yearArray[transaction.month - 1] += transaction.amount;
    sum += transaction.amount;
  });
  yearArray.map((sumMonth, index) => {
    result[index] = { [index + 1]: sumMonth };
    sum += sumMonth;
  });
  return { sum, result };
}
export default countYearlyByTypeHelper;
