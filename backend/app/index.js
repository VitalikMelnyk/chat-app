const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { port } = require("../helpers/constants");
const app = express();
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
// SOCKET CONFIG
const io = require("socket.io")(server);
// Connect to Mongo Cluster
const { User, Room, Message } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const {
  register,
  checkEmail,
  login,
  users,
  getCurrentUser,
  deleteUser,
  rooms,
} = require("../routes");
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// routes
app.use(register);
app.use(checkEmail);
app.use(login);
app.use(users);
app.use(getCurrentUser);
app.use(deleteUser);
app.use(rooms);

io.on("connection", (socket) => {
  socket.on("join room", async ({ room, user }) => {
    const { _id: roomId, name: roomName } = room;
    const { _id: userId } = user;
    socket.join(roomName);
    await Room.findOneAndUpdate(
      { _id: roomId },
      {
        $addToSet: {
          users: userId,
        },
      },
      { new: true, useFindAndModify: false }
    );
  });

  socket.on("new message", async ({ message, userId, roomId, roomName }) => {
    try {
      const createdMessage = await Message.create({
        user: userId,
        message: message,
      });
      await Room.findOneAndUpdate(
        { _id: roomId },
        {
          $addToSet: {
            messages: createdMessage._id,
          },
        },
        { new: true, useFindAndModify: false }
      );

      const lastMessage = await Message.findOne({
        user: userId,
      })
        .sort({ date: -1 })
        .populate({ path: "user", select: "firstName secondName" });

      io.in(roomName).emit("receive message", { lastMessage });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("typing", ({ firstName, secondName, roomName, isTyping }) => {
    console.log(`${firstName} ${secondName}`);
    console.log(roomName);
    if (isTyping) {
      socket
        .to(roomName)
        .emit("user typing", { userName: `${firstName} ${secondName}` });
    } else {
      socket.to(roomName).emit("user typing", { userName: "" });
    }
  });

  socket.on("disconnect", () => {});
});
