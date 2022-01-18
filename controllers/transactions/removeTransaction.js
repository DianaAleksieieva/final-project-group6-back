import { Transaction } from '../../schemas/mongoose/index.js';
import { User } from '../../schemas/mongoose/index.js';

const removeTransaction = async (req, res) => {
const userId = req.user.id;
const transactionId = req.params.id
const currentBalance = req.user.currentBalance;

const transaction = await Transaction.findOneAndRemove({
  _id: transactionId,
  owner: userId,
});

const { amount, type} =transaction; 
const newBalance = type.toString() === "expense" ? Number(currentBalance) + Number(amount) : Number(currentBalance) - Number(amount);

const user = await User.findByIdAndUpdate(
  {
    _id: userId},
    {currentBalance: newBalance.toString(),
  }
);


  res.status(201).json({status: 'success', _id: userId, currentBalance: newBalance.toString()});

}
export default removeTransaction;
