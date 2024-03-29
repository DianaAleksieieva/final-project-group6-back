import getMonthlyByTypeModel from '../../models/transactions/getMonthlyByTypeModel.js';
import httpError from 'http-errors';
import countMonthlyByTypeHelper from '../../helpers/countMonthlyByTypeHelper.js';

const getMonthlyByTypeController = async (req, res) => {
  const { params, user } = req;
  const type = params.type;
  const year = parseInt(params.year);
  const month = parseInt(params.month);

  const transactions = await getMonthlyByTypeModel(year, month, type, user);
  const total = transactions.length;

  const { sum, categories } = countMonthlyByTypeHelper(transactions);
  res
    .status(200)
    .send({ type, year, month, total, sum, categories, transactions });
};
export default getMonthlyByTypeController;
