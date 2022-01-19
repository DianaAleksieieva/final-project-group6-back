import axios from 'axios';
import queryString from 'query-string';
// const { BadRequest } = require('http-errors');
// const { User } = require('../../model');

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
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

const googleRedirect = async (req, res, next) => {
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
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
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
  const { id: verificationToken, name, email, picture } = userData.data;
  const { access_token: token } = tokenData.data;
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = new User({
      email,
      name,
      picture,
      token,
      verificationToken,
      isGoogle: true,
      verify: true,
    });
    await newUser.save();
  }
  if (user && !user.verify) {
    throw new BadRequest(
      'Not Verified. Please enter your email and confirm registration',
    );
  }
  if (user && user.token === null) {
    await User.findByIdAndUpdate(user._id, { token });
  }

  return res.redirect(`${process.env.FRONTEND_URL}/auth?accessToken=${token}`);
};


export default googleAuth;