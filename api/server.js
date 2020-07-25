const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const creatorRouter = require("./users/creatorRouter");
const EpisodesRouter = require("./episodes/episodeRouter");
const AuthRouter = require("./auth/authRouter");
const auth = require("./auth/authMiddleware");
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use("/api", AuthRouter);

// Can only accessed if logged in
server.use("/api/episodes", auth, EpisodesRouter);
server.use("/api/creator", auth, creatorRouter);

module.exports = server;
