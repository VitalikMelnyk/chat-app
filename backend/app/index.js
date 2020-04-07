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
const { User, Room } = require("../models/mongoDB/remoteMongoDB");
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

let clients = 0;
io.on("connection", (socket) => {
  // require("../sockets/chat/joinedUser")(io, socket);
  // clients++;
  // console.log(`User connected`);
  // io.emit("broadcast", { description: clients + " clients connected" });

  // socket.on("add room", async ({ id, roomName }) => {
  //   console.log(roomName);
  //   socket.join(roomName, async () => {
  //     io.emit("broadcast", { description: clients + " clients joined" });
  //     let rms = Object.keys(socket.rooms);
  //     console.log(rms);
  //     await User.findByIdAndUpdate(
  //       id,
  //       {
  //         $set: { socketId: socket.id },
  //       },
  //       { useFindAndModify: false }
  //     );
  //     const rooms = await Room.find({}, (err) => {
  //       if (err) return console.log(err);
  //     });
  //     const isRoomExisting = rooms.some((room) => room.name === roomName);
  //     if (isRoomExisting) {
  //       await Room.findOneAndUpdate(
  //         { name: roomName },
  //         {
  //           $addToSet: {
  //             users: id,
  //           },
  //         },
  //         { new: true, useFindAndModify: false },
  //         (err, res) => {
  //           if (err) {
  //             console.log(err);
  //           }
  //         }
  //       );
  //     } else {
  //       const roomInfo = {
  //         name: roomName,
  //         users: [id],
  //       };
  //       await Room.create(roomInfo, (err, result) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //       });
  //     }
  //   });
  // });

  socket.on("disconnect", () => {
    // clients--;
    // io.emit("broadcast", { description: clients + " clients connected" });
    // console.log("User disconnected");
  });
});
