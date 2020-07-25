const db = require("../data/DBconfig");

const router = require("express").Router();

router.post("/:creator_id/episode", (req, res) => {
  // Can't have the same username as either creator or player.
  // This gets enforced on /register for simplicity.

  if (
    !req.body.title ||
    !req.body.questions ||
    req.body.questions.length === 0
  ) {
    res.status(400).json({
      errorMessage:
        "Please provide appropriate title & at least one question for the episode.",
    });
  } else {
    if (db.verifyCreator(req.params.creator_id)) {
      const gg = db.createEpisode({
        ...req.body,
        creator_id: req.params.creator_id,
      });
      console.log(gg);
      // .then((episode) => {
      //   console.log("episode in router", episode);
      //   res.status(200).json({ episode });
      // })
      // .catch((err) =>
      //   res
      //     .status(500)
      //     .json({ error: "There was trouble when accessing the user" })
      // );
    } else {
      res.status(500).json({ error: "Please log in as a verified creator." });
    }
  }
});

// route.post("/login", (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.status(400).json({
//       errorMessage: "Please provide username and password for the user.",
//     });
//   } else {
//     // Remember to addd first() because it'll give an array
//     db.findBy(req.body.username)
//       .first()
//       .then((user) => {
//         if (user && bcrypt.compareSync(req.body.password, user.password)) {
//           const token = generateToken(user);
//           req.session.user = user;
//           res.status(200).json({ message: "Successfully logged in", token });
//         } else res.status(401).json({ message: "Invalid user credentials" });
//       })
//       .catch((err) =>
//         res
//           .status(500)
//           .json({ error: "There was trouble when accessing the user" })
//       );
//   }
// });

// route.put("/:id", (req, res) => {
//   if (!req.body.name || !req.body.completed) {
//     res.status(400).json({
//       errorMessage: "Please provide name and completed for the user.",
//     });
//   } else {
//     db.update(req.params.id, req.body)
//       .then((account) => {
//         if (!account) {
//           res.status(404).json({
//             message: "The user with the specified ID does not exist.",
//           });
//         } else res.status(200).json(account);
//       })
//       .catch((error) => {
//         res
//           .status(500)
//           .json({ error: "The user information could not be modified." });
//       });
//   }
// });

// route.get("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         res.send("error logging out");
//       } else {
//         res.send("Session successfully deleted, logged out.");
//       }
//     });
//   }
// });

// function generateToken(user) {
//   const payload = {
//     subject: user.nickname,
//     name: user.name,
//     department: user.department,
//   };
//   const secret = "idsfwgier37yehiwfe7rgfsdf73wupp999(^%$";
//   const options = {
//     expiresIn: "8h",
//   };
//   return jwt.sign(payload, secret, options);
// }

module.exports = router;
