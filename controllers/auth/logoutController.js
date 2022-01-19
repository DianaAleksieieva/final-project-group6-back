import { logoutModel } from '../../models/auth/index.js';
import httpError from 'http-errors';

const logoutController = async (req, res) => {
  const user = req.user;
  console.log(1233);

  const result = await logoutModel(user._id);
  if (!result) throw new httpError.Unauthorized('Not authorized');
  res.status(204).json();
};

export default logoutController;
