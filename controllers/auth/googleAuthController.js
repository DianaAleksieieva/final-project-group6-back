import axios from 'axios';
import queryString from 'query-string';
import httpError from 'http-errors';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import {nanoid} from 'nanoid';
import { User } from '../../schemas/mongoose/index.js';

const googleAuthController = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  );
};

const googleRedirectController = async (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { id, name, email, picture } = userData.data
  const { access_token: token } = tokenData.data
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = new User({ email, userName:name, avatarURL:picture, token, verificationToken:nanoid(), verify:true});
      newUser.setPassword(nanoid());
    await newUser.save();
  }
  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
   console.log(accessToken);
  await User.findByIdAndUpdate(user._id, { token: accessToken });
 console.log(token);

  if (user && user.token === null) {
    await User.findByIdAndUpdate(user._id,{token})
  }
    console.log(token);
  return res.redirect(
    `${process.env.FRONTEND_URL}/api/auth?${accessToken}`,
  );
};

export default { googleAuthController, googleRedirectController };