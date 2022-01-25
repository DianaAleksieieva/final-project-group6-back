import httpError from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '../../schemas/mongoose/index.js';

const refreshTokenModel = async refreshToken => {
  let userId;
  let user;
  const array = await User.find({ refreshToken });
  user = array[0];
  if (user) {
    console.log('we need to refresh Refresh token');
    userId = user._id;
  } else {
    console.log('we need to renew token in state');
    const { id } = jwt.verify(refreshToken, process.env.SECRET_KEY);
    user = await User.findById(id);
    userId = id;
  }

  if (!user || !user.token) {
    throw new httpError.Unauthorized('No authorized');
  }
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '15m',
  });
  refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '72h',
  });
  await User.findByIdAndUpdate(userId, { token, refreshToken });
  return {
    token,
    refreshToken,
    expiresIn: parseInt(new Date().getTime()) + 2.2 * 60 * 1000,
    user: {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    },
  };
};

export default refreshTokenModel;
