import getMonthlyByTypeModel from '../../models/transactions/getMonthlyByTypeModel.js';
import getLastHalfYearArrayHelper from './../../helpers/getLastHalfYearArrayHelper.js';

async function getLastHalfYearByTypeController(req, res) {
  const user = req.user;
  const { type } = req.params;
  const lastMonthsArray = getLastHalfYearArrayHelper();
  for (let i = 5; i > 0; i--) {
    const { month, year } = lastMonthsArray[i];
    const transactions = await getMonthlyByTypeModel(year, month, type, user);
    if (transactions.length) {
      lastMonthsArray[i].count = transactions.length;
      transactions.map(({ amount }) => (lastMonthsArray[i].sum += amount));
    }
  }
  res.status(200).send({ type, lastMonthsArray });
}

export default getLastHalfYearByTypeController;
