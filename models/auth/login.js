import httpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../../schemas/mongoose/index.js';

const { SECRET_KEY } = process.env;

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new httpError.Unauthorized(
      'Email or password is wrong or not verify',
    );
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  return {
    data: {
      token,
    },
  };
};

export default login;
