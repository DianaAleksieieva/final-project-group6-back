import { verifyEmailTokenModel } from '../../models/auth/index.js';

const verifyEmailTokenController = async (req, res) => {
  const { emailToken } = req.params;
  const result = await verifyEmailTokenModel(emailToken);
  res.status(200).json(result);
};

export default verifyEmailTokenController;
