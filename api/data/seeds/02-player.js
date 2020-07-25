const bcrypt = require("bcryptjs");

exports.seed = (knex) => {
  return knex("player")
    .truncate()
    .then(() => {
      return knex("player").insert([
        {
          username: "bob",
          password: bcrypt.hashSync("password"),
        },
        {
          username: "natasha1980",
          password: bcrypt.hashSync("123"),
        },
      ]);
    });
};
