import httpError from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '../../schemas/mongoose/index.js';

const refreshTokenModel = async refreshToken => {
  const { id } = jwt.verify(refreshToken, process.env.SECRET_KEY);
  const user = await User.findById(id);
  if (!user || !user.token) {
    throw new httpError.Unauthorized('No authorized');
  }
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '15m',
  });
  refreshToken = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '10h',
  });
  await User.findByIdAndUpdate(id, { token, refreshToken });
  return {
    token,
    refreshToken,
    user: {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    },
  };
};

export default refreshTokenModel;
