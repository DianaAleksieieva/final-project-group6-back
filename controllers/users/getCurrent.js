import { User } from '../../models/index.js';

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: 'sucess',
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

export default getCurrent;
