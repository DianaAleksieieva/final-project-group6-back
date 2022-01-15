import { login } from '../../models/auth/index.js';

async function loginController(req, res) {
  const body = req.body;
  const data = await login(body);
  res.status(200).send(data);
}
export default loginController;