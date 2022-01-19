import { Transaction } from '../../schemas/mongoose/index.js';

const addTransactionModel = async (
  body,
  { currentMonth, currentYear },
  user,
) => {
  const { _id, owner, type, date, description, category, amount } =
    await Transaction.create({
      ...body,
      date: body.date,
      month: currentMonth,
      year: currentYear,
      owner: user._id,
    });
  return { _id, owner, type, date, description, category, amount };
};

export default addTransactionModel;
