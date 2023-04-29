/* eslint-disable no-undef */
import httpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../../schemas/mongoose/index.js';

const loginModel = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new httpError.Unauthorized('Email or password is wrong');
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    //  expiresIn: '15m'
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    //  expiresIn: '72h'
  });
  await User.findByIdAndUpdate(user._id, { token, refreshToken });
  return {
    token,
    refreshToken,
    expiresIn: parseInt(new Date().getTime()) + 2.1 * 60 * 1000 * 4 * 24 * 365,
    user: {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    },
  };
};

export default loginModel;
