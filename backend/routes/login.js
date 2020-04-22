const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const { redisClient } = require("../models/redis");
const {
  handleError,
  ErrorHandler,
  isVerifyPassword,
  generateToken,
  decodeTokenExpiresIn,
  accessTokenSecret,
  refreshTokenSecret,
} = require("../helpers");

router.post("/login", async (req, res, next) => {
  const { email: emailFromClient, password: passwordFromClient } = req.body;
  try {
    // Check email exist on base entering credentials
    const getUserFromDB = await User.findOne({ email: emailFromClient });
    if (!getUserFromDB) {
      throw new ErrorHandler(400, "Such email doesn't exist");
    }
    const {
      email: userEmailFromDB,
      password: userPasswordFromDB,
      id: userId,
    } = getUserFromDB;
    const verifyPassword = await isVerifyPassword(
      passwordFromClient,
      userPasswordFromDB
    );
    if (!verifyPassword) {
      throw new ErrorHandler(400, "Password isn't correct!");
    }
    // Generate token to client
    if (userEmailFromDB && verifyPassword) {
      const accessToken = await generateToken(userId, accessTokenSecret, "1d");
      const refreshToken = await generateToken(
        userId,
        refreshTokenSecret,
        "7d"
      );
      const expireDate = await decodeTokenExpiresIn(accessToken);
      const options = { accessToken, refreshToken, expireDate };
      redisClient.set(userId, JSON.stringify(options));
      return res.send(options);
    }
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
});

module.exports = router;
