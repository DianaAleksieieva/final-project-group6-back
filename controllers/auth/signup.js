const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar")
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers/sendEmail");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} is already exist`);
  }
  const verificationToken = nanoid()
  const avatarURL = gravatar.url({email})
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Email Verify",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Ckick to verify</a>`,
  };

  await sendEmail(mail);
  
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
