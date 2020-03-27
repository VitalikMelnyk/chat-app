const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Connect to Mongo Cluster
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
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
    });
    return res.status(200).send("You are Registered!");
  } catch (error) {
    console.log(error);
    // return res.send(error);
  }
});

app.post("/checkExistEmailOfUserInDB", async (req, res, next) => {
  const { email } = req.body;
  try {
    let checkEmailFromDB = await User.findOne({ email });
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
  const { email: emailFromApp, password: passwordFromApp } = req.body;
  try {
    // Check email exist on base entering credentials
    const getUserFromDB = await User.findOne({ email: emailFromApp });
    if (!getUserFromDB) {
      throw new ErrorHandler(400, "Such email doesn't exist");
    }
    const {
      email: userEmailFromDB,
      password: userPasswordFromDB,
      id: userId
    } = getUserFromDB;
    const verifyPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(passwordFromApp, userPasswordFromDB, (err, success) => {
        if (err) {
          console.log(err);
        }
        resolve(success);
      });
    });
    if (!verifyPassword) {
      throw new ErrorHandler(400, "Password isn't correct!");
    }
    // Generate token to client
    if (userEmailFromDB && verifyPassword) {
      const accessToken = jwt.sign({ userId }, accessTokenSecret, {
        algorithm: "HS256",
        expiresIn: "1h"
      });
      const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
        algorithm: "HS256",
        expiresIn: "7d"
      });
      const expireDate = jwt.decode(accessToken).exp;
      const options = { accessToken, refreshToken, expireDate };
      redisClient.set(userId, JSON.stringify(options));
      return res.send(options);
    }
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
});

const verifySync = async (token, tokenSecret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, decoded) => {
      console.log(err, decoded);
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const isAuth = async (req, res, next) => {
  const tokenFromBrowser = req.headers.authorization;
  if (!tokenFromBrowser) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    let decodedData;
    try {
      decodedData = await verifySync(tokenFromBrowser, accessTokenSecret);
    } catch (err) {
      // ,
      res.status(401).send("User isn't authorized");
    }
    const user = await User.findOne({ _id: decodedData.userId });
    if (!user) {
      res.status(401).send("User didn't find ");
    }

    const tokenFromRedis = await new Promise((resolve, reject) => {
      redisClient.get(user.id, (err, result) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(JSON.parse(result));
      });
    });

    if (tokenFromBrowser === tokenFromRedis.accessToken) {
      req.user = user;
      next();
    } else {
      res.status(401).send("Tokens aren't match ");
    }
  }
};

app.get("/users", isAuth, async (req, res) => {
  const users = await User.find({}, err => {
    if (err) return console.log(err);
  });

  return res.status(200).send(users);
});

app.get("/getCurrentUser", isAuth, async (req, res) => {
  return res.status(200).send(req.user);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
