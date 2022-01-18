async function getCurrentController(req, res) {
  const { email, subscription } = req.user;
  console.log('current user - ', { subscription });
  res.status(200).send({ email, subscription });
}

export default getCurrentController;
