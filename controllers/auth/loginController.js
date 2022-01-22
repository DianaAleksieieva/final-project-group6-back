import { loginModel } from '../../models/auth/index.js';

async function loginController(req, res) {
  const { body } = req;
  const { testmode = false } = req;

  const data = await loginModel(body);

  if (testmode) return { status: 200, data };
  res.status(200).send(data);
}
export default loginController;
