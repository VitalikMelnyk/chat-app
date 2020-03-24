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
const {
  port,
  saltRounds,
  accessTokenSecret,
  refreshTokenSecret
} = require("../helpers/constants");
const { ErrorHandler, handleError } = require("../helpers/error");
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
      return res.status(400).send(validateErrors.errors);
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
    // return res.send(error);
  }
});

app.post("/checkExistEmailOfUserInDB", async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    let checkEmailFromDB = await User.findOne({ email });
    console.log(checkEmailFromDB);
    if (checkEmailFromDB) {
      throw new ErrorHandler(400, "Such email is existed!");
    }
    return res.send("Ok");
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check email exist on base entering credentials
    const getUserFromDB = await User.findOne({ email: email });
    console.log(getUserFromDB);
    if (!getUserFromDB) {
      throw new ErrorHandler(400, "Such email doesn't exist");
    }
    const {
      email: userEmailFromDB,
      password: userPasswordFromDB,
      id: userId
    } = getUserFromDB;
    console.log("Email: ", userEmailFromDB);
    console.log("Password", userPasswordFromDB);

    const verifyPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userPasswordFromDB, (err, success) => {
        if (err) {
          console.log(err);
        }
        resolve(success);
      });
    });
    console.log(verifyPassword);
    if (!verifyPassword) {
      throw new ErrorHandler(400, "Password isn't correct!");
    }
    // Generate token to client
    if (userEmailFromDB && verifyPassword) {
      const accessToken = jwt.sign({ userId }, accessTokenSecret, {
        algorithm: "HS256",
        expiresIn: "1d"
      });
      const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
        algorithm: "HS256",
        expiresIn: "7d"
      });
      const expireDate = jwt.decode(accessToken).exp;

      console.log("AccessToken:", accessToken);
      console.log("RefreshToken:", refreshToken);
      const options = { accessToken, refreshToken, expireDate };
      redisClient.set(userId, JSON.stringify(options));
      return res.send({ accessToken, refreshToken, expireDate });
    }
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
