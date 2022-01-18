function countMonthlyByTypeHelper(transactions) {
  let sum = 0;
  let descs = {};
  transactions.map(({ category, amount, description }) => {
    if (!descs[category])
      descs[category] = { sum: 0, count: 0, descriptions: {} };
    descs[category].descriptions[description] = descs[category].descriptions[
      description
    ]
      ? descs[category].descriptions[description] + amount
      : amount;
    descs[category].sum += amount;
    descs[category].count++;
    sum += amount;
  });
  return { sum, categories: descs };
}
export default countMonthlyByTypeHelper;
