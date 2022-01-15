import { balance } from '../../models/transactions/index.js';

const balanceUpdate = async (req, res) => {
  const { currentBalance } = req.body;
  const { user } = req;
  const newBalance = await balance(currentBalance, user);
  return res.json({
    currentBalance: newBalance,
  });
};
export default balanceUpdate;
