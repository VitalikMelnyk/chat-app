const register = require("./register");
const checkEmail = require("./checkEmail");
const login = require("./login");
const users = require("./users");
const getCurrentUser = require("./getCurrentUser");
const deleteUser = require("./user/delete");
const rooms = require("./rooms");
module.exports = {
  register,
  checkEmail,
  login,
  users,
  getCurrentUser,
  deleteUser,
  rooms,
};
