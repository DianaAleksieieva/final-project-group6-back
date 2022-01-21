import { registerModel } from '../../models/auth/index.js';
import { nanoid } from 'nanoid';

async function registerController(req, res) {
  const body = req.body;
  const verificationToken = nanoid();
  const data = await registerModel(body, verificationToken);
  res.status(201).send(data);
}
export default registerController;
