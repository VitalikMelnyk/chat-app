const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { Room } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { Room } = require("../models/mongoDB/localMongoDB");
const { handleError, ErrorHandler } = require("../helpers");

router.get("/rooms", async (req, res) => {
  const rooms = await Room.find({}, (err) => {
    if (err) return console.log(err);
  });

  return res.status(200).send(rooms);
});
router.post("/rooms", async (req, res) => {
  const { roomName } = req.body;
  const rooms = await Room.find({ name: roomName }, (err) => {
    if (err) return console.log(err);
  });
  try {
    if (rooms.length) {
      throw new ErrorHandler(400, "Such room exist");
    } else {
      await Room.create({ name: roomName, users: [] }, (err, room) => {
        if (err) {
          throw new ErrorHandler(400, err);
        } else {
          console.log(room);
          return res.status(200).json({
            message: "You successfull added the room",
            newRoom: room,
          });
        }
      });
    }
  } catch (error) {
    return handleError(error, res);
  }
});

router.delete("/rooms/:id", async (req, res) => {
  await Room.findByIdAndRemove(
    { _id: req.params.id },
    { useFindAndModify: false },
    (err, room) => {
      if (err) {
        console.log(err);
      }
      if (!room) {
        return res.status(404).json({ error: `Room not found` });
      }
      return res.status(200).json({
        message: "You successfull deleted the room",
        deletedRoom: room,
      });
    }
  );
});

module.exports = router;
