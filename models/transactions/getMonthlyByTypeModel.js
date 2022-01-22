import { Transaction } from '../../schemas/mongoose/index.js';

const getMonthlyByTypeModel = async (year, month, type, user) => {
  return await Transaction.find(
    { year, month, type, owner: user._id },
    '_id date category description amount',
  );
};
export default getMonthlyByTypeModel;
