import { Transaction } from '../../schemas/mongoose/index.js';

const getAllMonthlyByCategoryModel = async (month, year, categories, user) => {
  return await Transaction.find(
    { month, year, category: { $in: categories }, owner: user._id },
    '_id date amount type category date',
  );
};
export default getAllMonthlyByCategoryModel;
