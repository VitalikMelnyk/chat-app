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

router.get("/rooms/:id", async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id }).populate({
    path: "messages",
    populate: {
      path: "user",
      select: "firstName secondName",
    },
  });
  return res.status(200).send(room);
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

const getRemovedRoom = async (id) => {
  return await new Promise((resolve, reject) => {
    Room.findOneAndDelete(
      { _id: id },
      { useFindAndModify: false },
      (err, room) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(room);
        }
      }
    );
  });
};

router.delete("/rooms/:id", async (req, res) => {
  const deletedRoom = await getRemovedRoom(req.params.id);
  return res.status(200).json({
    message: "You successfully deleted the room",
    deletedRoom: deletedRoom,
  });
});

module.exports = router;
