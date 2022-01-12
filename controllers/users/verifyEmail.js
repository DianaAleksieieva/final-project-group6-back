const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
    const { varificationToken } = req.params;
    const user = await User.findOne({ varificationToken });
    if (!user) {
         throw NotFound()
    }
    await User.findOneAndUpdate(user._id, { verify: true, varificationToken:null });
  res.json({
    message: "success",
    });
};

module.exports = verifyEmail;
