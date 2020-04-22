const express = require("express");
const router = express.Router();
// Connect to Mongo Cluster
const { User } = require("../models/mongoDB/remoteMongoDB");
// Connect to local MongoDB
// const { User } = require("../models/mongoDB/localMongoDB");
const { validationResult } = require("express-validator");
const {
  validateRegistration,
} = require("../helpers/validator/validateRegistration");
const { getHashedPassword, saltRounds } = require("../helpers");

router.post("/register", validateRegistration(), async (req, res, next) => {
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
    zipCode,
  } = req.body;
  try {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      console.log(validateErrors);
      return res.status(400).send(validateErrors.errors);
    }
    // Hashed password
    const hashedPassword = await getHashedPassword(password, saltRounds);
    console.log(hashedPassword);
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
      zipCode,
    };
    await User.create(userInfo, (err, result) => {
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

module.exports = router;
