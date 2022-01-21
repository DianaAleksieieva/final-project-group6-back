import queryString from 'query-string';
import dotenv from 'dotenv';
dotenv.config();

const googleAuthModel = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
};

export default googleAuthModel;
