import getYearlyByTypeModel from '../../models/transactions/getYearlyByTypeModel.js';
import httpError from 'http-errors';
import countYearlyByTypeHelper from '../../helpers/countYearlyByTypeHelper.js';

const getYearlyByTypeController = async (req, res) => {
  const { params, user } = req;
  const type = params.type;
  const year = parseInt(params.year);

  const transactions = await getYearlyByTypeModel(type, year, user);

  const { sum, result } = countYearlyByTypeHelper(transactions);
  res.status(200).send({ type, year, sum, result });
};

export default getYearlyByTypeController;
