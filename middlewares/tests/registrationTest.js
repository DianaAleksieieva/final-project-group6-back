import registerController from '../../controllers/auth/registerController.js';
import {
  connect,
  clearDatabase,
  closeDatabase,
} from '../../bin/dbMongoMemory.js';

beforeAll(async () => await connect());
// afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase());

const registrationTest = async (email, password, token) => {
  const authorization = token ? 'Bearer ' + token : '';
  const req = {
    body: { email, password },
    headers: { authorization },
    testmode: true,
  };
  const res = {};

  try {
    const result = await registerController(req, res);
    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

export default registrationTest;
