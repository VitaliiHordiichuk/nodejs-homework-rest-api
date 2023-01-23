const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");
require("dotenv").config();
const sendEmail = require("../../middleware/sendEmail");
const { BASE_URL } = process.env;

const resendMailConfirm = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findUser({ email });

    if (!user) {
      throw NotFound("User was not found");
    }

    if (user.verify) {
      throw BadRequest({
        message: "Verification has already been passed",
      });
    }
    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
    };
    await sendEmail(mail);

    return res.status(200).json({
      code: 200,
      message: "Verification email sent",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = resendMailConfirm;
