import httpError from 'http-errors';
import { User } from '../../schemas/mongoose/index.js';
import gravatar from 'gravatar';

async function register({ email, password, name, verificationToken }) {
  const user = await User.findOne({ email });
  if (user) {
    throw new httpError.Conflict('Email in use');
  }
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    email,
    password,
    avatarURL,
    name,
    verificationToken,
  });

  return {
    user: { email: newUser.email, subscription: newUser.subscription },
    token: newUser.token,
  };
}

export default register;
