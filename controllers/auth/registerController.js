import { register } from '../../models/auth/index.js';
// import httpErrors from 'http-errors';
// import sendEmail from '../../helpers/sendEmail.js';
import { nanoid } from 'nanoid';

async function registerController(req, res) {
  const body = req.body;
  const verificationToken = nanoid();
  const data = await register(body, verificationToken);
  res.status(201).send(data);

  // sendEmail(email, verificationToken);
}
export default registerController;
