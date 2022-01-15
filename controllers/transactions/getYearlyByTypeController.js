import getYearlyByTypeModel from '../../models/transactions/getYearlyByTypeModel.js';
import httpError from 'http-errors';
import countYearlyByTypeHelper from '../../helpers/countYearlyByTypeHelper.js';

const getYearlyByTypeController = async (req, res) => {
  const { params, user } = req;
  const type = params.type;
  const year = parseInt(params.year);

  const transactions = await getYearlyByTypeModel(type, year, user);
  if (!transactions.length) throw new httpError.NotFound('Not found');

  const { sum, result } = countYearlyByTypeHelper(transactions);
  res.status(200).send({ type, year, sum, result });
};

export default getYearlyByTypeController;

// ResponseBody: {
//   "type" : 'income',
//   "year" : 2019,
//   "sum" : 8330,
//   "result": {
//     1: 2533,
//     2: 334,
//     3: 5463,
//     4: null,
//     5: null,
//     6: null,
//     7: null,
//     8: null,
//     9: null,
//     10: null,
//     11: null,
//     12: null,
//   },
