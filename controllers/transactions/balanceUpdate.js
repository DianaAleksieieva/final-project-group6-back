import { balance } from '../../models/transactions/index.js';

const balanceUpdate = async (req, res) => {
  const { currentBalance } = req.body;
  const { _id } = req.user;
  console.log(_id);
  const newBalance = await balance(currentBalance, _id);
  return res.json({
    currentBalance: newBalance,
  });
};
export default balanceUpdate;
