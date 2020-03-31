const bcrypt = require("bcrypt");
// await doesen't wait for bcrypt.hash because bcrypt.hash does not
//  return a promise. Use the following method, which wraps bcrypt
//  in a promise in order to use await.
const getHashedPassword = async (password, saltRounds) => {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};
const isVerifyPassword = async (passwordFromClient, passwordFromBackend) => {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(passwordFromClient, passwordFromBackend, (err, success) => {
      if (err) {
        console.log(err);
      }
      resolve(success);
    });
  });
};

module.exports = { getHashedPassword, isVerifyPassword };
