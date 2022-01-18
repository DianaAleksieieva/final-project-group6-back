async function getCurrentController(req, res) {
  const { email, subscription } = req.user;
  res.status(200).send({ email, subscription });
}

export default getCurrentController;
