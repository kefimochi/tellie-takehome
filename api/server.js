const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const UsersRouter = require("./users/userRouter");
const EpisodesRouter = require("./episodes/episodeRouter");
const AuthRouter = require("./auth/authRouter");
const auth = require("./auth/authMiddleware");
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use("/api", AuthRouter);
server.use("/api/users", UsersRouter);

// Can only see all created episodes if logged in
server.use("/api/episodes", auth, EpisodesRouter);

module.exports = server;
