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
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const {
  register,
  checkEmail,
  login,
  users,
  getCurrentUser,
  deleteUser
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

io.on("connection", socket => {
  // require("../sockets/chat/joinedUser")(io, socket);

  console.log(`User connected`);



  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("room", async ({ message, userName, id, room }) => {
    socket.join(room);
    await User.findByIdAndUpdate(
      id,
      {
        $set: { socketId: socket.id }
      },
      { useFindAndModify: false }
    );
    const user = await User.findById(id);
    const data = { user, message };
    const userJoined = "is joined";
    io.emit("user joined", { user, userJoined });
    io.emit("receive message", data);

    const userLeave = "is left";
    socket.on("leave room", room => {
      console.log(1112112,room);
      // socket.leave(room);
      // socket.to(room).emit("user left", { user, userLeave });
    });
  });
});
