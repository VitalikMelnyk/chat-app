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
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on("chat message", msg => {
    console.log(` ${msg}`);
  });
});
