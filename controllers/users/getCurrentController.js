async function getCurrentController(req, res) {
  const user = JSON.parse(JSON.stringify(req.user));
  res.status(200).send({
    _id: user._id,
    email: user.email,
    userName: user.userName,
    avatarUrl: user.avatarUrl,
    currentBalance: user.currentBalance,
    startBalance: user.startBalance,
  });
}

export default getCurrentController;
