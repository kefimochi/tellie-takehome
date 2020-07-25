const db = require("../data/DBconfig");
const router = require("express").Router();

router.get("/", (req, res) => {
  db.findEpisodes()
    .then((episode) => {
      res.status(200).json(episode);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The episode list could not be retrieved.", error });
    });
});

router.get("/:episode_id", (req, res) => {
  db.findEpisodes(req.params.episode_id)
    .then((episode) => {
      res.status(200).json(episode);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The episode list could not be retrieved.", error });
    });
});

// Retrieves all questions with matching episode_id
router.get("/:episode_id/questions", (req, res) => {
  db.findEpisodeQuestions(req.params.episode_id)
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The questions list could not be retrieved.", error });
    });
});

module.exports = router;
