import httpError from 'http-errors';
import { User } from '../../models/index.js';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new httpError.Conflict(`User with ${email} is already exist`);
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url({ email });
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: 'Email Verify',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Ckick to verify</a>`,
  };

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
        verificationToken,
      },
    },
  });
};

export default signup;
