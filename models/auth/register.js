import httpError from 'http-errors';
import { User } from '../../schemas/mongoose/index.js';
import gravatar from 'gravatar';

async function register({ email, password, name, verificationToken }) {
  const user = await User.findOne({ email });
  if (user) {
    throw new httpError.Conflict('Email in use');
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, name, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  return {
    user: {
      email,
      subscription: newUser.subscription,
      avatarURL,
      verificationToken,
    },
  };
}

export default register;
