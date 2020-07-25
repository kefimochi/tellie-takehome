const bcrypt = require("bcryptjs");

exports.seed = (knex) => {
  return knex("creator")
    .truncate()
    .then(() => {
      return knex("creator").insert([
        {
          username: "kefimochi",
          password: bcrypt.hashSync("password"),
        },
        {
          username: "god123",
          password: bcrypt.hashSync("123"),
        },
      ]);
    });
};
