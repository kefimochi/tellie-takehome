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

const getLastId = async (tableName) => {
  const lastEpisode = await db(tableName).orderBy("id", "desc").first();
  return await lastEpisode.id;
};

/* Data format:
 *  { creator_id, title,
 *   questions: [{question, answer}, {question, answer}] }
 */
const createEpisode = async (data) => {
  const lastEpisodeId = await getLastId("episode");
  let lastQuestionId = await getLastId("question");
  console.log("result, ", lastEpisodeId, lastQuestionId);
  console.log(data);

  const episodeWithId = await db("episode").insert({
    id: lastEpisodeId + 1,
    creator_id: data.creator_id,
    title: data.title,
  });

  await data.questions.forEach((question) => {
    db("question").insert({
      id: lastQuestionId + 1,
      episode_id: lastEpisodeId + 1,
      question: question.question,
      answer: question.answer,
    });
    lastQuestionId++;
  });

  return await episodeWithId;
};

// questionable, needs more testing
const verifyCreator = async (username) => {
  return await db("creator").where({ username: username }).first();
};

module.exports = {
  findEpisodes,
  episodesByCreator,
  register,
  isNameTaken,
  findUser,
  findEpisodeQuestions,
  findStartedEpisodes,
  updateScore,
  createEpisode,
  verifyCreator,
};
