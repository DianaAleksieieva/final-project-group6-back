const { Conflict } = require("http-errors");
const { User } = require("../../models");

const signout = async (req, res) => {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, {token: null})
 
  res.status(204).json({
    status: "No Content",
    code: 204
  });
};

module.exports = signout;
