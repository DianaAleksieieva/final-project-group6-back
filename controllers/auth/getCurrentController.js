async function getCurrentController(req, res) {
  const { email, _id, userName, avatarURL, currentBalance, startBalance } =
    req.user;
  res
    .status(200)
    .send({ email, _id, userName, avatarURL, currentBalance, startBalance });
}

export default getCurrentController;
