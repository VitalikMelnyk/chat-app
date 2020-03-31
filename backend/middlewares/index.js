// Connect to Mongo Cluster
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const {
  verifyToken,
  accessTokenSecret,
  getTokenFromRedis
} = require("../helpers");

const isAuth = async (req, res, next) => {
  const tokenFromBrowser = req.headers.authorization;
  if (!tokenFromBrowser) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    let decodedData;
    try {
      decodedData = await verifyToken(tokenFromBrowser, accessTokenSecret);
    } catch (err) {
      res.status(401).send("User isn't authorized");
    }
    const user = await User.findOne({ _id: decodedData.userId });
    if (!user) {
      res.status(401).send("User didn't find ");
    }
    const tokenFromRedis = await getTokenFromRedis(user);
    console.log(tokenFromRedis);
    if (tokenFromBrowser === tokenFromRedis.accessToken) {
      req.user = user;
      next();
    } else {
      res.status(401).send("Tokens aren't match ");
    }
  }
};

module.exports = { isAuth };
