exports.seed = (knex) => {
  return knex("player_episodes_bridge")
    .truncate()
    .then(() => {
      return knex("player_episodes_bridge").insert([
        {
          player_id: "bob",
          episode_id: 0,
          score: 0,
        },
        {
          player_id: "bob",
          episode_id: 0,
          score: 1,
        },
        {
          player_id: "natasha1980",
          episode_id: 1,
          score: 2,
        },
      ]);
    });
};
