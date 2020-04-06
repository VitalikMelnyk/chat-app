const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { Room } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { Room } = require("../models/mongoDB/localMongoDB");
router.get("/rooms", async (req, res) => {
  const rooms = await Room.find({}, (err) => {
    if (err) return console.log(err);
  });

  return res.status(200).send(rooms);
});

module.exports = router;
