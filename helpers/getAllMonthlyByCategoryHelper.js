const getAllMonthlyByCategoryHelper = transactions => {
  const total = transactions.length;
  let sum = 0;
  transactions.map(({ amount }) => {
    sum += amount;
  });
  return { total, sum };
};

export default getAllMonthlyByCategoryHelper;
