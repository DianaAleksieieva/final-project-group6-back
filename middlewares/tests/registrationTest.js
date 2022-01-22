import registerController from '../../controllers/auth/registerController.js';
import { joiRegisterSchema } from '../../schemas/joi/users.js';
import {
  connect,
  clearDatabase,
  closeDatabase,
} from '../../bin/dbMongoMemory.js';

beforeAll(async () => await connect());
// afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase());

const registrationTest = async (email, password, token, userName) => {
  const authorization = token ? 'Bearer ' + token : '';
  const req = {
    body: { email, password, userName },
    headers: { authorization },
    testmode: true,
  };
  const res = {};

  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw new Error(error);
    }
    const result = await registerController(req, res);
    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

export default registrationTest;
