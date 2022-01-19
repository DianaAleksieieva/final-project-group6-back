import { Transaction } from '../../schemas/mongoose/index.js';

async function removeTransactionModel(id) {
  return await Transaction.findOneAndRemove({
    _id: id,
  });
}
export default removeTransactionModel;
