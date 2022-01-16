import { Transaction } from '../../schemas/mongoose/index.js';

const addTransaction = async (req, res) => {
  const date = req.body.date.split('.');
  const currentMonth = Number(date[1]);
  const currentYear = Number(date[2]);
  const updatedNewTransaction = {
    ...req.body,
    date: req.body.date,
    month: currentMonth,
    year: currentYear,
    owner: req.user._id,
  };
  const newTransaction = await Transaction.create(updatedNewTransaction);
  res.status(201).json({ newTransaction, status: 'success' });
};
export default addTransaction;
