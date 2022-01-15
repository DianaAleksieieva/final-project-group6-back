import { User } from '../../models/index.js';

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    status: 'No Content',
    code: 204,
  });
};

export default signout;
