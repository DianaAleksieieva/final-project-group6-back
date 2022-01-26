import httpError from 'http-errors';

import { User } from '../schemas/mongoose/index.js';

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      throw new httpError.Unauthorized('No authorized');
    }
    const user = await User.find({ token });
    if (!user[0]) {
      throw new httpError.Unauthorized('No authorized');
    }
    req.user = user[0]; // костыль для аватарки. иначе передает undefined
    if (req.testmode) return req.user;
    next();
  } catch (error) {
    if (error.massage === 'Invalid sugnature') {
      error.status = 401;
    }
    next(error);
  }
};

export default authMiddleware;
