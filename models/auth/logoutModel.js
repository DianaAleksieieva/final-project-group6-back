import { User } from '../../schemas/mongoose/index.js';

async function logoutModel(_id) {
  await User.findByIdAndUpdate({ _id }, { token: null });
  console.log('logout - success');
  return true;
}

export default logoutModel;
