import httpError from 'http-errors';
import { User } from '../../schemas/mongoose/index.js';
import gravatar from 'gravatar';

async function register(email, password, verificationToken) {
  console.log('life is fun');
  // if (await User.findOne({ email }))
  //   throw new httpError.Conflict('Email in use');
  // const avatarUrl = gravatar.url(email);
  // const newUser = await User.create({
  //   email,
  //   password,
  //   avatarUrl,
  //   verificationToken,
  // });
  // console.log(chalk.keyword('lightblue')('user successfully created'));
  // return {
  //   user: { email: newUser.email, subscription: newUser.subscription },
  //   token: newUser.token,
  // };
}

export default register;
