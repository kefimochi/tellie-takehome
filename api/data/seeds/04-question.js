exports.seed = (knex) => {
  return knex("question")
    .truncate()
    .then(() => {
      return knex("question").insert([
        {
          id: 0,
          episode_id: 0,
          question:
            "Is the color green made from a mixture of yellow and blue?",
          answer: true,
        },
        {
          id: 1,
          episode_id: 0,
          question: "Would 2 plus 2 equal 5?",
          answer: true,
        },
        {
          id: 2,
          episode_id: 1,
          question: "Was The Doctor originally born on planet Gallifrey?",
          answer: true,
        },
      ]);
    });
};
