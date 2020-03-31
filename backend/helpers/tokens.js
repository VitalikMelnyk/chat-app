const jwt = require("jsonwebtoken");
const { redisClient } = require("../models/redis");
// Generate token to client
const generateToken = async (userId, tokenSecret, expiresIn = "10s") => {
  return await jwt.sign({ userId }, tokenSecret, {
    algorithm: "HS256",
    expiresIn: expiresIn
  });
};

const verifyToken = async (token, tokenSecret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, decoded) => {
      console.log(err, decoded);
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const decodeTokenExpiresIn = async token => await jwt.decode(token).exp;

const getTokenFromRedis = async user => {
  return await new Promise((resolve, reject) => {
    redisClient.get(user.id, (err, result) => {
      if (err) {
        reject(err);
        throw err;
      }
      resolve(JSON.parse(result));
    });
  });
};

module.exports = {
  generateToken,
  decodeTokenExpiresIn,
  verifyToken,
  getTokenFromRedis
};
