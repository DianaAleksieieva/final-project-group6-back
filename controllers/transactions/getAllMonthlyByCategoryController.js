import getAllMonthlyByCategoryModel from '../../models/transactions/getAllMonthlyByCategoryModel.js';
import httpError from 'http-errors';
import getAllMonthlyByCategoryHelper from '../../helpers/getAllMonthlyByCategoryHelper.js';

const getAllMonthlyByCategoryController = async (req, res) => {
  const { params, user, body } = req;
  const { categories } = body;
  const month = parseInt(params.month);
  const year = parseInt(params.year);
  const transactions = await getAllMonthlyByCategoryModel(
    month,
    year,
    categories,
    user,
  );
  if (!transactions.length) throw new httpError.NotFound('Not found');
  const { total, sum } = getAllMonthlyByCategoryHelper(transactions);
  res
    .status(200)
    .send({ total, month, year, sum, categories, result: transactions });
};
export default getAllMonthlyByCategoryController;
