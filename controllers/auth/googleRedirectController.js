import { googleRedirectModel } from '../../models/auth/index.js';

const googleRedirectController = async (req, res) => {
  const accessToken = await googleRedirectModel(req);
  return res.redirect(`${process.env.FRONTEND_URL}/api/auth/?${accessToken}`);
};

export default googleRedirectController;
