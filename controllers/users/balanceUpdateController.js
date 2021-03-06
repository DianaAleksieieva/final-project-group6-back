import { balanceUpdateModel } from '../../models/users/index.js';

const balanceUpdateController = async (req, res) => {
  const { currentBalance } = req.body;
  const { _id } = req.user;
  const newBalance = await balanceUpdateModel(currentBalance, _id);
  return res.json({
    currentBalance: newBalance,
  });
};
export default balanceUpdateController;
