import { User } from '../../schemas/mongoose/index.js';

const balanceUpdateModel = async (currentBalance, id) => {
  const updateBalance = await User.findByIdAndUpdate(
    id,
    { currentBalance },
    { new: true },
  );
  return updateBalance.currentBalance;
};

export default balanceUpdateModel;
