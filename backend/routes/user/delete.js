const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { User } = require("../../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../../models/mongoDB/localMongoDB");

router.delete("/users/:id", async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `user not found` });
    }

    // return res.status(200).json({ success: true, data: user });
    return res.status(200).send("User is deleted!");
  }).catch(err => console.log(err));
});

module.exports = router;
