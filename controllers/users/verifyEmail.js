import { User } from '../../models/index.js';
import httpError from 'http-errors';

const verifyEmail = async (req, res) => {
  const { varificationToken } = req.params;
  const user = await User.findOne({ varificationToken });
  if (!user) {
    throw httpError.NotFound();
  }
  await User.findOneAndUpdate(user._id, {
    verify: true,
    varificationToken: null,
  });
  res.json({
    message: 'success',
  });
};

export default verifyEmail;
