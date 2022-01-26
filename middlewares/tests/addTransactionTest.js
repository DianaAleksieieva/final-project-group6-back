import addTransactionController from '../../controllers/transactions/addTransactionController.js';
import {
  addIncomeJoiSchema,
  addExpenseJoiSchema,
  addTransactionJoiSchema,
} from '../../schemas/joi/transactions';
import authMiddleware from '../auth';
const next = error => {
  throw Error(error.message);
};
const addTransactionTest = async (
  type,
  category,
  date,
  amount,
  description,
  token,
) => {
  const authorization = token ? 'Bearer ' + token : '';
  const req = {
    body: { type, category, date, amount, description },
    headers: { authorization },
    testmode: true,
  };
  let res = {};

  try {
    let schemaResponse;
    if (req.body.type === 'income') {
      schemaResponse = addIncomeJoiSchema.validate(req.body);
    } else if (req.body.type === 'expense') {
      schemaResponse = addExpenseJoiSchema.validate(req.body);
    } else {
      schemaResponse = addTransactionJoiSchema.validate(req.body);
    }
    const { error } = schemaResponse;

    if (error) {
      error.status = 400;
      throw new Error(error);
    }
    req.user = await authMiddleware(req, res, next);
    const { data, status } = await addTransactionController(req, res);
    return { data, status };
  } catch (error) {
    throw Error(error.message);
  }
};

export default addTransactionTest;
