const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { User } = require("../models/mongoDB/remoteMongoDB");
const { User } = require("../models/mongoDB/localMongoDB");
const { redisClient } = require("../models/redis");
const { port } = require("../helpers/constants");
const app = express();
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/register", async (req, res, next) => {
  console.log(req.body);
  const { email, password, date, city, gender } = req.body;
  return res.status(200).send("Registered!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
