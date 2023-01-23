const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcript = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const sendEmail = require("../../middleware/sendEmail");

const { BASE_URL } = process.env;
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User wish ${email} already exist`);
  }
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcript.hashSync(password, bcript.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    verificationToken,
    password: hashPassword,
    avatarURL,
  });
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
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
      },
    },
  });
  return result;
};

module.exports = register;
