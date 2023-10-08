async function getCurrentController({ user }, res) {
  try {
  res.status(200).send({
    _id: user._id,
    email: user.email,
    userName: user.userName,
    avatarUrl: user.avatarUrl,
    currentBalance: user.currentBalance,
    startBalance: user.startBalance,
  })}
  catch (error) {console.log('current user fatch error')
  }
}

export default getCurrentController;
