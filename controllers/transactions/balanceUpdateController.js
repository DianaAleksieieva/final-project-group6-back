import { balanceUpdateModel } from '../../models/transactions/index.js';

const balanceUpdateController = async (req, res) => {
  const { currentBalance } = req.body;
  const { _id } = req.user;
  console.log(_id);
  const newBalance = await balanceUpdateModel(currentBalance, _id);
  return res.json({
    currentBalance: newBalance,
  });
};
export default balanceUpdateController;
