import httpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../schemas/mongoose/index.js';

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  console.log(token);
  try {
    if (bearer !== 'Bearer') {
      throw new httpError.Unauthorized('No authorized');
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new httpError.Unauthorized('No authorized');
    }
    req.user = user; // костыль для аватарки. иначе передает undefined
    next();
  } catch (error) {
    if (error.massage === 'Invalid sugnature') {
      error.status = 401;
    }
    next(error);
  }
};

export default authMiddleware;
