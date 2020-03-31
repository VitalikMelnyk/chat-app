const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");

const { handleError, ErrorHandler } = require("../helpers");

router.post("/checkExistEmailOfUser", async (req, res, next) => {
  const { email } = req.body;
  try {
    let checkEmailFromDB = await User.findOne({ email });
    if (checkEmailFromDB) {
      throw new ErrorHandler(400, "Such email is existed!");
    }
    return res.send("Ok");
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
});

module.exports = router;
