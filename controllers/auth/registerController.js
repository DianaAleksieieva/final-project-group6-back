import { register } from '../../models/auth/index.js';
import httpErrors from 'http-errors';
// import sendEmail from '../../helpers/sendEmail.js';
import { nanoid } from 'nanoid';

async function registerController(req, res) {
  const { authorization = '' } = req.headers;
  if (authorization) throw new httpErrors.BadRequest('Please logout');
  const { testmode = false } = req;
  const body = req.body;
  const verificationToken = nanoid();
  const data = await register(body, verificationToken);
  if (testmode) return { status: 201, data };
  res.status(201).send(data);

  // sendEmail(email, verificationToken);
}
export default registerController;
