import { Transaction } from '../../schemas/mongoose/index.js';

const getYearlyByTypeModel = async (type, year, user) => {
  return await Transaction.find(
    { year, type, owner: user._id },
    '_id owner type date  category amount month year',
  ).populate('owner', '_id email userName');
};
export default getYearlyByTypeModel;
