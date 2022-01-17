import { Transaction } from '../../schemas/mongoose/index.js';
import { User } from '../../schemas/mongoose/index.js';

const removeTransaction = async (req, res) => {

const userId = req.user.id;
const transactionId = req.params.id
const currentBalance = req.user.currentBalance;
console.log('id_user', userId);
console.log('id_transaction', transactionId);
console.log('currentBalance', currentBalance);

const transaction = await Transaction.findOneAndRemove({
  _id: transactionId,
  owner: userId,
});

const { amount } =transaction; 
console.log("amount", amount);
const newBalance = currentBalance + amount;
console.log("newBalance", newBalance);
console.log(`Transaction with id=${transactionId} removed`);


// await User.findByIdAndUpdate(
//   { id,
//     currentBalance: newBalance },
// );
}
export default removeTransaction;
