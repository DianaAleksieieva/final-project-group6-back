function countMonthlyByTypeHelper(transactions) {
  let sum = 0;
  let descs = {};
  transactions.map(({ category, amount, description }) => {
    if (!descs[category]) descs[category] = {};
    descs[category][description] = descs[category][description]
      ? descs[category][description] + amount
      : amount;
    sum += amount;
  });
  return { sum, categories: descs };
}
export default countMonthlyByTypeHelper;
