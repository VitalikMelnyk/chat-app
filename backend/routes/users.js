const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const { isAuth } = require("../middlewares");
router.get("/users", isAuth, async (req, res) => {
  const users = await User.find({}, err => {
    if (err) return console.log(err);
  });

  return res.status(200).send(users);
});

module.exports = router;
