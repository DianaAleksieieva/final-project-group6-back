import getAllMonthlyByCategoryModel from '../../models/transactions/getAllMonthlyByCategoryModel.js';
import httpError from 'http-errors';
import getAllMonthlyByCategoryHelper from '../../helpers/getAllMonthlyByCategoryHelper.js';

const getAllMonthlyByCategoryController = async (req, res) => {
  const { params, user, body } = req;
  const { category } = body;
  const month = parseInt(params.month);
  const year = parseInt(params.year);
  const transactions = await getAllMonthlyByCategoryModel(
    month,
    year,
    category,
    user,
  );
  if (!transactions.length) throw new httpError.NotFound('Not found');
  const { total, sum, description } =
    getAllMonthlyByCategoryHelper(transactions);
  res
    .status(200)
    .send({ year, month, total, sum, category, description, transactions });
};
export default getAllMonthlyByCategoryController;
