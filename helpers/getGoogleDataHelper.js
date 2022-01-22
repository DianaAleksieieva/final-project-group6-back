import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getGoogleTokenHelper = async (req, code) => {
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

  return { tokenData, userData };
};

export default getGoogleTokenHelper;
