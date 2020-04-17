const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const { isAuth } = require("../middlewares");
router.get("/users", async (req, res) => {
  const users = await User.find({}, (err) => {
    if (err) return console.log(err);
  });

  return res.status(200).send(users);
});

router.delete("/users/:id", async (req, res) => {
  await User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `user not found` });
    }
    return res.status(200).send("User is deleted!");
  }).catch((err) => console.log(err));
});

router.get("/getCurrentUser", isAuth, async (req, res) => {
  return res.status(200).send(req.user);
});

module.exports = router;
