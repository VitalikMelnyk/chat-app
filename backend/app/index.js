const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { port } = require("../helpers/constants");
const app = express();

// Connect to Mongo Cluster
const { User, Room, Message } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const { register, checkEmail, login, users, rooms } = require("../routes");
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
app.use(rooms);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// SOCKET CONFIG
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("join room", async ({ room, user }) => {
    const { _id: roomId, name: roomName } = room;
    const { _id: userId } = user;
    if (socket.room) {
      socket.leave(socket.room);
    }
    socket.room = roomName;
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
        room: roomId,
        message: message,
      });

      const lastMessage = await Message.findOne({
        _id: createdMessage._id,
      }).populate({ path: "user", select: "firstName secondName" });
      console.log(lastMessage);

      io.in(roomName).emit("receive message", { lastMessage });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("typing", ({ firstName, secondName, roomName, isTyping }) => {
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
