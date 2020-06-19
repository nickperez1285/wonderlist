const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userAssistance = require("./auth-helper.js");

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const invalidUser = await userAssistance.findBy({ username }).first();

    if (invalidUser) {
      res
        .status(409)
        .json({ message: "Sorry, that username is already taken" });
    }
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    const newUser = await userAssistance.add(user);

    res.status(200).json(newUser.id);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
