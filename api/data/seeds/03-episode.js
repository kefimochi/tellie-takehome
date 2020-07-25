exports.seed = (knex) => {
  return knex("episode")
    .truncate()
    .then(() => {
      return knex("episode").insert([
        {
          id: 0,
          creator_id: "kefimochi",
          title: "How well you know your own mind?",
        },
        {
          id: 1,
          creator_id: "kefimochi",
          title: "Test your Doctor Who knowledge!",
        },
      ]);
    });
};
