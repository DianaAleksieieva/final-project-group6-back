import httpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../schemas/mongoose/index.js';

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    //   if (bearer !== 'Bearer') {
    //     throw new httpError.Unauthorized('No authorized');
    //   }
    //   const { id } = jwt.verify(token, SECRET_KEY);
    //   const user = await User.findById(id);
    //   if (!user || !user.token) {
    //     throw new httpError.Unauthorized('No authorized');
    //   }
    // req.user = user;
    req.user = {
      _id: '61e09dc909927ca3105b32b4',
      isLoggedIn: false,
      token: null,
      userName: 'Иван Васильевич',
      password: '123456',
      avatarUrl: 'https://cdn.tvc.ru/pictures/o/246/533.jpg',
      startBalance: 10000,
      currentBalance: 5,
      verify: false,
    };
    next();
  } catch (error) {
    if (error.massage === 'Invalid sugnature') {
      error.status = 401;
    }
    next(error);
  }
};

export default authMiddleware;
