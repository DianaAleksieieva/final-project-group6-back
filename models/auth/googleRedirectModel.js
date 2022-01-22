import queryString from 'query-string';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { User } from '../../schemas/mongoose/index.js';
import getGoogleDataHelper from '../../helpers/getGoogleDataHelper.js';
import dotenv from 'dotenv';
dotenv.config();

const googleRedirectModel = async req => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const { tokenData, userData } = await getGoogleDataHelper(req, code);

  const { id, name, email, picture } = userData.data;
  const { access_token: token } = tokenData.data;
  const user = await User.findOne({ email });

  if (!user) {
    const newUser = new User({
      email,
      userName: name,
      avatarUrl: picture,
      token,
      verificationToken: nanoid(),
      verify: true,
    });
    newUser.setPassword(nanoid());
    await newUser.save();
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  await User.findByIdAndUpdate(user._id, { token: accessToken });

  if (user && user.token === null) {
    await User.findByIdAndUpdate(user._id, { token });
  }

  return accessToken;
};

export default googleRedirectModel;
