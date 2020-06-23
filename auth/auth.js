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

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Credentials Invalid",
  };

  try {
    const user = await userAssistance
      .findBy({ username: req.body.username })
      .first();
    if (!user) {
      res.status(401).json({message : "Bad user"});
    }
    const password = req.body.password;
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      res.status(401).json({message : "Bad Pass"});
    }

    const tokenPayload = {
      userId: user.id,
      role: "authorized",
    };

    res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET));

    res.status(200).json({
      message: `Welcome ${user.username}`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
