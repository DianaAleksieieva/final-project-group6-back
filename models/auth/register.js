import httpError from 'http-errors';
import { User } from '../../schemas/mongoose/index.js';
import gravatar from 'gravatar';

async function register({ email, password, userName }, verificationToken) {
  const user = await User.findOne({ email });
  if (user) {
    throw new httpError.Conflict('Email in use');
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, userName, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  return {
    token: newUser.token,
    user: {
      _id: newUser._id,
      email,
      userName,
    },
  };
}

export default register;
