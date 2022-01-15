import { User } from '../../schemas/mongoose/index.js';

const balance = async (currentBalance, user) => {
  const { id } = user;
  const updateBalance = await User.findByIdAndUpdate(id, { currentBalance });
  return updateBalance.currentBalance;
};

export default balance;
