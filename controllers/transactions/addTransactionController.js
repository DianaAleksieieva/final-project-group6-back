import httpError from 'http-errors';
import getYearMonthHelper from '../../helpers/getYearMonthHelper.js';
import calculateNewBalanceHelper from '../../helpers/calculateNewBalanceHelper.js';
import { addTransactionModel } from '../../models/transactions/index.js';
import { balanceUpdateModel } from '../../models/users/index.js';

const addTransactionController = async ({ body, user }, res) => {
  const { type, amount } = body;
  const date = getYearMonthHelper(body.date);

  const transaction = await addTransactionModel(body, date, user);
  if (!transaction) throw new httpError.BadRequest('some wrong');

  const balance = calculateNewBalanceHelper(type, amount, user);
  const newBalance = await balanceUpdateModel(balance, user._id);
  if (!newBalance) throw new httpError.BadRequest('some wrong');

  res.status(201).json({
    transaction,
    oldBalance: user.currentBalance,
    currentBalance: newBalance,
  });
};
export default addTransactionController;
