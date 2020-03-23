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
const { port, saltRounds } = require("../helpers/constants");
const {
  validateRegistration
} = require("../helpers/validator/validateRegistration");
const { validationResult, check } = require("express-validator");
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

app.post("/register", validateRegistration(), async (req, res, next) => {
  console.log(req.body);
  const {
    firstName,
    secondName,
    gender,
    email,
    password,
    city,
    telephoneNumber,
    birthdayDate,
    country,
    address,
    zipCode
  } = req.body;
  try {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      console.log(validateErrors);
      return res.status(422).json({ errors: validateErrors.array() });
    }

    // Check email exist
    let checkEmailFromDB = await User.findOne({ email });
    console.log(checkEmailFromDB);
    if (checkEmailFromDB) {
      throw new ErrorHandler(400, "Such email is existed!");
    }

    // await doesen't wait for bcrypt.hash because bcrypt.hash does not
    //  return a promise. Use the following method, which wraps bcrypt
    //  in a promise in order to use await.
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    const userInfo = {
      firstName,
      secondName,
      gender,
      email,
      password: hashedPassword,
      city,
      telephoneNumber,
      birthdayDate,
      address,
      country,
      zipCode
    };
    const insertUser = await User.create(userInfo, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Registered");
    });
    return res.status(200).send("You are Registered!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
