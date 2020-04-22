const { getHashedPassword, isVerifyPassword } = require("./bcrypt");
const {
  generateToken,
  decodeTokenExpiresIn,
  verifyToken,
  getTokenFromRedis,
} = require("./tokens");
const {
  LOCAL_CONNECTION_URL,
  REMOTE_CONNECTION_URL,
  accessTokenSecret,
  refreshTokenSecret,
  port,
  saltRounds,
} = require("./constants");
const { ErrorHandler, handleError } = require("./error");
const { validateRegistration } = require("./validator/validateRegistration");

module.exports = {
  getHashedPassword,
  isVerifyPassword,
  generateToken,
  verifyToken,
  getTokenFromRedis,
  decodeTokenExpiresIn,
  LOCAL_CONNECTION_URL,
  REMOTE_CONNECTION_URL,
  accessTokenSecret,
  refreshTokenSecret,
  port,
  saltRounds,
  ErrorHandler,
  handleError,
  validateRegistration,
};
