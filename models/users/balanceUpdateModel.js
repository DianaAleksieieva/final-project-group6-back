import { User } from '../../schemas/mongoose/index.js';

const balanceUpdateModel = async (currentBalance, user, type) => {
  let updatedUser;
  if (type === 'transaction') {
    // если добавляется транзакция - то она ни как не влияет на стартовый баланс
    updatedUser = await User.findByIdAndUpdate(
      user._id,
      { currentBalance },
      { new: true },
    );
  } else {
    // если старт баланс пустой - то сюда передается стартовый баланс
    const start =
      user.startBalance === null ? currentBalance : user.startBalance;
    const current =
      user.startBalance === null
        ? currentBalance + parseInt(user.currentBalance)
        : currentBalance;

    updatedUser = await User.findByIdAndUpdate(
      user._id,
      { currentBalance: current, startBalance: start },
      { new: true },
    );
  }

  return {
    currentBalance: updatedUser.currentBalance,
    startBalance: updatedUser.startBalance,
  };
};

export default balanceUpdateModel;
