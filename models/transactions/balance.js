import { User } from '../../schemas/mongoose/index.js';

const balance = async (currentBalance, id) => {
  const updateBalance = await User.findByIdAndUpdate(
    id,
    { currentBalance },
    { new: true },
  );
  return updateBalance.currentBalance;
};

export default balance;
