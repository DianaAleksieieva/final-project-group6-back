function calculateNewBalanceHelper(type, amount, user) {
  const currentBalance = parseInt(user.currentBalance);
  if (type === 'income') return currentBalance + amount;
  return currentBalance - amount;
}

export default calculateNewBalanceHelper;
