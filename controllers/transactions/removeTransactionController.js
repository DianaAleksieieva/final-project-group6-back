import httpError from 'http-errors';
import calculateNewBalanceHelper from '../../helpers/calculateNewBalanceHelper.js';
import { removeTransactionModel } from '../../models/transactions/index.js';
import { balanceUpdateModel } from '../../models/users/index.js';

const removeTransactionController = async (
  { params, user, testmode = false },
  res,
) => {
  const { _id, type, date, description, category, amount } =
    await removeTransactionModel(params.id);
  if (!type) throw new httpError.NotFound('Not found');

  const balance = calculateNewBalanceHelper(type, amount, user, 'forRemove');
  const newBalance = await balanceUpdateModel(balance, user, 'transaction');
  if (!newBalance) throw new httpError.BadRequest('some wrong');

  if (testmode) return{
    status: 200,
    data: {
      message: 'transaction deleted',
      oldBalance: user.currentBalance,
      currentBalance: newBalance.currentBalance,
      transaction: { _id, type, date, description, category, amount },
    },
  };

  res.status(200).json({
    message: 'transaction deleted',
    oldBalance: user.currentBalance,
    currentBalance: newBalance.currentBalance,
    transaction: { _id, type, date, description, category, amount },
  });
};
export default removeTransactionController;
