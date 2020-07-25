const db = require("../data/DBconfig");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  const username = req.body.username;

  // Register receives "isCreator" boolean to figure out
  // whether the account will be granted creator's or player's access.
  if (!username || !req.body.password || req.body.isCreator == null) {
    res.status(400).json({
      errorMessage:
        "Please provide username, password, and account type for the user.",
    });
  } else if (
    db.isNameTaken(username, "creator") ||
    db.isNameTaken(username, "player")
  ) {
    res.status(400).json({
      errorMessage: "User name is already taken, please try again.",
    });
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    db.register(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((error) => {
        res.status(500).json({
          error: "There was an error while saving the user to the database",
        });
      });
  }
});

router.post("/login", (req, res) => {
  // Can't have the same username as either creator or player
  // This gets enforced on /register for simplicity
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      errorMessage:
        "Please provide username and password for the user when logging in.",
    });
  } else {
    db.findUser(req.body.username)
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: "Successfully logged in", token });
        } else res.status(401).json({ message: "Invalid user credentials" });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ error: "There was trouble when accessing the user" })
      );
  }
});

const generateToken = (user) => {
  const payload = {
    username: user.username,
  };
  const secret = "idsfwgTARDISr37yehiwfe7rgfsdf73wupp999(^%$";
  const options = {
    expiresIn: "8h",
  };
  return jwt.sign(payload, secret, options);
};

module.exports = router;
