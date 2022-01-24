import getMonthlyByTypeModel from '../../models/transactions/getMonthlyByTypeModel.js';
import getLastHalfYearArrayHelper from './../../helpers/getLastHalfYearArrayHelper.js';

async function getLastHalfYearByTypeController(req, res) {
  console.log(1);
  const user = { _id: '61e09dc909927ca3105b32b4' };
  const { type } = req.params;
  const { lastMonthsArray, currentYear } = getLastHalfYearArrayHelper();
  for (let i = 5; i > 0; i--) {
    const { month, year, count, sum } = lastMonthsArray[i];
    const transactions = await getMonthlyByTypeModel(year, month, type, user);
    if (transactions.length) {
      lastMonthsArray[i].count = transactions.length;
      transactions.map(({ amount }) => (lastMonthsArray[i].sum += amount));
    }
  }
  res.status(200).send({ type, lastMonthsArray });
}

export default getLastHalfYearByTypeController;
