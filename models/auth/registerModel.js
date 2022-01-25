import httpError from 'http-errors';
import { User } from '../../schemas/mongoose/index.js';
import gravatar from 'gravatar';
const experes1 = '15m';

const registerModel = async (
  { email, password, userName },
  verificationToken,
) => {
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (user) {
    throw new httpError.Conflict('Email in use');
  }
  const avatarUrl = 'http:' + gravatar.url(email);
  const newUser = new User({ email, userName, avatarUrl, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  return {
    token: newUser.token,
    refreshToken: newUser.refreshToken,
    expiresIn: parseInt(new Date().getTime()) + 15 * 60 * 1000,

    user: {
      _id: newUser._id,
      email: newUser.email,
      userName: newUser.userName,
    },
  };
};

export default registerModel;
