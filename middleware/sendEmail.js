const sgMail = require("@sendgrid/mail");
require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;
console.log();
sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

const sendEmail = async (data) => {
  const email = { ...data, from: "bogdan.lyamzin.d@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
