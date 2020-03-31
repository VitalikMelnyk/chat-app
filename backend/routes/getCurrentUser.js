const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares");

router.get("/getCurrentUser", isAuth, async (req, res) => {
  return res.status(200).send(req.user);
});

module.exports = router;
