exports.up = (knex) => {
  return (
    knex.schema
      .createTable("creator", (creator) => {
        creator.string("username", 128).primary();
        creator.string("password", 18).notNullable().defaultTo("");
      })
      .createTable("player", (player) => {
        player.string("username", 128).primary();
        player.string("password", 18).notNullable().defaultTo("");
      })
      .createTable("episode", (episode) => {
        episode.increments("id");
        episode.string("creator_id", 128).notNullable();
        episode.foreign("creator_id").references("creator.username");
        episode.string("title", 300).notNullable().defaultTo("");
      })
      .createTable("question", (question) => {
        question.increments("id");
        question.integer("episode_id").unsigned().notNullable();
        question.foreign("episode_id").references("episode.id");
        question.string("question", 300).notNullable();
        question.boolean("answer").notNullable();
      })
      // Bridge between players & what episodes they've started
      .createTable("player_episodes_bridge", (bridge) => {
        bridge.string("player_id", 128).notNullable();
        bridge.foreign("player_id").references("player.username");
        bridge.integer("episode_id").notNullable();
        bridge.foreign("episode_id").references("episode.id");
        bridge.integer("score").notNullable().defaultTo(0);
      })
  );
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists("creator")
    .dropTableIfExists("player")
    .dropTableIfExists("episode")
    .dropTableIfExists("question")
    .dropTableIfExists("player_episodes_bridge");
};
