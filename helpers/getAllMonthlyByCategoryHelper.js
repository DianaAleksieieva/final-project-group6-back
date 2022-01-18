const getAllMonthlyByCategoryHelper = transactions => {
  const total = transactions.length;
  let sum = 0;
  const desc = {};
  transactions.map(({ amount, description }) => {
    if (!desc[description]) desc[description] = { total: 0, sum: 0 };
    desc[description].total++;
    desc[description].sum += amount;
    sum += amount;
  });
  return { total, sum, description: desc };

};

export default getAllMonthlyByCategoryHelper;
