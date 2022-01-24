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

  const { name, email, picture } = userData.data;
  const { access_token: token } = tokenData.data;
  const user = await User.findOne({ email });

  let googleUser = user;

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
    googleUser = newUser;
  }

  const accessToken = jwt.sign({ id: googleUser._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  User.findByIdAndUpdate(googleUser._id, { token: accessToken });

  if (googleUser && googleUser.token === null) {
    await User.findByIdAndUpdate(googleUser._id, { token: accessToken });
  }

  return accessToken;
};

export default googleRedirectModel;
