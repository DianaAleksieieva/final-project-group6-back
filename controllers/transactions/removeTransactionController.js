import httpError from 'http-errors';
import calculateNewBalanceHelper from '../../helpers/calculateNewBalanceHelper.js';
import {
  balanceUpdateModel,
  removeTransactionModel,
} from '../../models/transactions/index.js';

const removeTransactionController = async ({ params, user }, res) => {
  const { type, amount } = await removeTransactionModel(params.id);
  if (!type) throw new httpError.NotFound('Not found');

  const balance = calculateNewBalanceHelper(type, amount, user);
  const newBalance = await balanceUpdateModel(balance, user._id);
  if (!newBalance) throw new httpError.BadRequest('some wrong');

  res.status(201).json({
    message: 'transaction deleted',
    oldBalance: user.currentBalance,
    currentBalance: newBalance,
  });
};
export default removeTransactionController;
