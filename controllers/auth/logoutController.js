import { logout } from '../../models/auth/index.js';

const logoutController = async (req, res) => {
  const user = req.user;

  const result = await logout(user._id);
  if (result) res.status(204).json();
};

export default logoutController;
