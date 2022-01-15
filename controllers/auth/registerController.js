import { register } from '../../models/auth/index.js';
import httpErrors from 'http-errors';
import sendEmail from '../../helpers/sendEmail.js';
import { v4 } from 'uuid';

async function registerController(req, res) {
  const { testmode = false } = req;
  const { authorization = '' } = req.headers;
  if (authorization) throw new httpErrors.BadRequest('Please logout');

  const { email, password } = req.body;
  const verificationToken = v4.uuidv4();

  const data = await register(email, password, verificationToken);
  sendEmail(email, verificationToken);
  if (testmode) return { status: 201, data };
  res.status(201).send(data);
}
export default registerController;
