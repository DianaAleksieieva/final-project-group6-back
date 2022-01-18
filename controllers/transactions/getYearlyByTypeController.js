import getYearlyByTypeModel from '../../models/transactions/getYearlyByTypeModel.js';
import httpError from 'http-errors';
import countYearlyByTypeHelper from '../../helpers/countYearlyByTypeHelper.js';

const getYearlyByTypeController = async (req, res) => {
  const { params, user, body } = req;
  const type = body.type;
  const year = parseInt(params.year);

  const transactions = await getYearlyByTypeModel(type, year, user);
  if (!transactions.length) throw new httpError.NotFound('Not found');

  const { sum, result } = countYearlyByTypeHelper(transactions);
  res.status(200).send({ type, year, sum, result });
};

export default getYearlyByTypeController;
