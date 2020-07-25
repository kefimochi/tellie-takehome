const knex = require("knex");
const configOptions = require("../knexfile").development;
const db = knex(configOptions);

const findEpisodes = (id) => {
  return id ? db("episode").where({ id: id }) : db("episode");
};

const episodesByCreator = (id) => {
  return db("episode").where({ creator_id: id });
};

const register = (userData) => {
  // Separating 'isCreator' from the data that'll be pushed to db
  const userObject = {
    username: userData.username,
    password: userData.password,
  };

  return userData.isCreator
    ? db("creator").insert(userObject)
    : db("player").insert(userObject);
};

const isNameTaken = (username, userType) => {
  const foundUser = db(userType).where({ username: username });
  let userLength = 0;
  foundUser.then((user) => {
    userLength = user.length;
  });
  return userLength > 0 ? true : false;
};

// I simplified the logic so that you can only have a unique name as
// either a creator or player.
const findUser = async (username) => {
  const creator = await db("creator").where({ username: username }).first();
  const player = await db("player").where({ username: username }).first();
  return { ...creator, ...player };
};

const findEpisodeQuestions = (id) => {
  return db("question").where({ episode_id: id });
};

const findStartedEpisodes = (playerId) => {
  return db("player_episodes_bridge").where({ player_id: playerId });
};

const updateScore = (playerId, episodeId, newScore) => {
  return db("player_episodes_bridge")
    .where("player_id", playerId)
    .andWhere("episode_id", episodeId)
    .update({ score: newScore });
};

// function update(id, resource) {
//   return db("users").where("id", Number(id)).update(resource);
// }

module.exports = {
  findEpisodes,
  episodesByCreator,
  register,
  isNameTaken,
  findUser,
  findEpisodeQuestions,
  findStartedEpisodes,
  updateScore,
};
