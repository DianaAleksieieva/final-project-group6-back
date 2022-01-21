import { googleAuthModel } from '../../models/auth/index.js';
import stringifyParamsHelper from '../../helpers/stringifyParamsHelper.js';

const googleAuthController = async (req, res) => {
  const stringifiedParams = await stringifyParamsHelper(googleAuthModel);
  const googleOauthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  return res.redirect(`${googleOauthURL}?${stringifiedParams}`);
};

export default googleAuthController;
