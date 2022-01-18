import httpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../../schemas/mongoose/index.js';

const verifyEmailTokenModel = async verificationToken => {
  const user = await User.findOne({ verificationToken, verify: false });

  if (!user) throw new httpError.NotFound('User not found');

  await User.findByIdAndUpdate(
    { _id: user._id },
    { verify: true, verificationToken: null },
  );
  return { message: 'Verification successful' };
};

export default verifyEmailTokenModel;
