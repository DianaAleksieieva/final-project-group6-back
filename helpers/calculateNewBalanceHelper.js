function calculateNewBalanceHelper(type, amount, user, whatFor = 'forAdd') {
  const mult = whatFor === 'forAdd' ? 1 : -1;
  const currentBalance = parseInt(user.currentBalance);
  if (type === 'income') return currentBalance + amount * mult;
  return currentBalance - amount * mult;
}

export default calculateNewBalanceHelper;
