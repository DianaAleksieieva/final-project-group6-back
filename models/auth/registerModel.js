import httpError from 'http-errors';
import { User } from '../../schemas/mongoose/index.js';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const registerModel = async (
  { email, password, userName },
  verificationToken,
) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (user) {
    throw new httpError.Conflict('Email in use');
  }
  const createdAvatar = createAvatar(avataaars, {
    seed: "Felix"
  });

  // const avatarUrl = createdAvatar.toString();
  // const avatarUrl = gravatar.url(email, { protocol: 'https' });
  // const avatarUrl = 'http:' + gravatar.url(email);
  const avatarUrl =''
  const newUser = new User({ email, userName, avatarUrl, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  return {
    token: newUser.token,
    refreshToken: newUser.refreshToken,
    expiresIn: parseInt(new Date().getTime()) + 15 * 60 * 1000 * 4 * 24 * 365,

    user: {
      _id: newUser._id,
      email: newUser.email,
      userName: newUser.userName,
    },
  };
};

export default registerModel;
