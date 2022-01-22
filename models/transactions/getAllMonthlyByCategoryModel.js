import { Transaction } from '../../schemas/mongoose/index.js';

const getAllMonthlyByCategoryModel = async (month, year, category, user) => {
  return await Transaction.find(
    { month, year, category, owner: user._id },
    '_id date amount type category description date',
  );
};
export default getAllMonthlyByCategoryModel;
