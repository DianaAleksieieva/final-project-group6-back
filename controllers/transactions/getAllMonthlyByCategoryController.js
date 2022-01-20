import getAllMonthlyByCategoryModel from '../../models/transactions/getAllMonthlyByCategoryModel.js';
import httpError from 'http-errors';
import getAllMonthlyByCategoryHelper from '../../helpers/getAllMonthlyByCategoryHelper.js';

const getAllMonthlyByCategoryController = async (req, res) => {
  const { params, user } = req;

  const category = params.category;
  const month = parseInt(params.month);
  const year = parseInt(params.year);
  const transactions = await getAllMonthlyByCategoryModel(
    month,
    year,
    category,
    user,
  );
  console.log(transactions);
  if (!transactions.length) throw new httpError.NotFound('Not found');
  const { total, sum } = getAllMonthlyByCategoryHelper(transactions);
  res
    .status(200)
    .send({ total, month, year, sum, category, result: transactions });
};
export default getAllMonthlyByCategoryController;
