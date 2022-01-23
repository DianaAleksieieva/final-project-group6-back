import { balanceUpdateModel } from '../../models/users/index.js';

const balanceUpdateController = async (req, res) => {
  const { currentBalance } = req.body;
  const { user } = req;
  const newBalance = await balanceUpdateModel(currentBalance, user);
  return res.json({
    startBalanceOld: user.startBalance,
    startBalance: newBalance.startBalance,
    currentBalanceOld: user.currentBalance,
    currentBalance: newBalance.currentBalance,
  });
};
export default balanceUpdateController;
