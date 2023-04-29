import removeTransactionController from '../../controllers/transactions/removeTransactionController.js';
import { idJoiSchema } from '../../schemas/joi/transactions';
import authMiddleware from '../auth';
const next = error => {
  throw Error(error.message);
};
const removeTransactionTest = async (id, token) => {
  const authorization = token ? 'Bearer ' + token : '';
  const req = {
    params: {  id  },
    headers: { authorization },
    testmode: true,
  };
  let res = {};

  try {
    const { error } = idJoiSchema.validate(req.params);
    
    if (error) {
        error.status = 400;
        throw new Error(error);
    }
    console.log(id);
    req.user = await authMiddleware(req, res, next);
    const { data, status } = await removeTransactionController(req, res);
    return { data, status };
  } catch (error) {
    throw Error(error.message);
  }
};

export default removeTransactionTest;
