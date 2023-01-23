const register = require("./singup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const createAvatar = require("./createAvatar");
const verify = require("./verifyEmail");
const resendMailConfirm = require("./resendMailConfirm");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  createAvatar,
  verify,
  resendMailConfirm,
};
