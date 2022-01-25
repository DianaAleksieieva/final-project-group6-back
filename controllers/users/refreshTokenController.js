import refreshTokenModel from '../../models/users/refreshTokenModel.js';

async function refreshTokenController(req, res, next) {
  const { authorization = '' } = req.headers;
  const [bearer, refreshToken] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      throw new httpError.Unauthorized('No authorized');
    }
    const data = await refreshTokenModel(refreshToken);

    res.status(200).send(data);
  } catch (error) {
    if (error.massage === 'Invalid sugnature') {
      error.status = 401;
    }
  }
}
export default refreshTokenController;
