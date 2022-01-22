import loginController from '../../controllers/auth/loginController.js';
import { joiLoginSchema } from '../../schemas/joi/users.js';
import {
  connect,
  clearDatabase,
  closeDatabase,
} from '../../bin/dbMongoMemory.js';

beforeAll(async () => await connect());
// afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase());

const loginTest = async (email, password, token) => {
  const authorization = token ? 'Bearer ' + token : '';
  const req = {
    body: { email, password },
    headers: { authorization },
    testmode: true,
  };
  const res = {};

  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw new Error(error);
    }
    const result = await loginController(req, res);
    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

export default loginTest;
