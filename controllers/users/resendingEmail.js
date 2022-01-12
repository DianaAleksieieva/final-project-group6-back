const { User } = require("../../models");
const { NotFound } = require("http-errors");

const resendingEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    throw {
      message: "missing required field email",
      status: 400,
    };
  }
    const user = await User.findOne({ email });
    if (user.verify) {
        throw {
          message: "Verification has already been passed",
          status: 400,
        };
    }
      await User.findOneAndUpdate(user._id, {
        verify: true,
        varificationToken: null,
      });
  res.json({
    message: "success",
  });
};

module.exports = resendingEmail;
