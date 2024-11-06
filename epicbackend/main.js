const express = require("express");
const cors = require("cors");
const path = require("path");
const init = require("./db");
require("dotenv").config();
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const booksRoute = require("./routes/books");
const CommentsRoute = require("./routes/comments");
const routeNotFoundMiddleWare = require("./middlewere/requestTimeMiddleware");
const requestTimeMiddleware = require("./middlewere/requestTimeMiddleware");
const blockIpMiddleware = require("./middlewere/blockIpMiddleware");
const badRequestHandler = require("./middlewere/badRequestHandler");
const genericErrorHandler = require("./middlewere/generiErroreMiddlewere");
const emailRoute = require("./routes/sendEmail");
const googleRoute = require("./routes/google");
const notAllowIp = process.env.BANNEDIPS
  ? process.env.BANNEDIPS.split(",")
  : [];

const PORT = 3061;

const server = express();

server.use("/uploads", express.static(path.join(__dirname, "/uploads")));

server.use(express.json());
server.use(cors());
//server.use(blockIpMiddleware);
server.use(requestTimeMiddleware);
server.use("/", usersRoute);
server.use("/", loginRoute);
server.use("/", booksRoute);
server.use("/", CommentsRoute);
server.use("/", emailRoute);
server.use("/", googleRoute);
server.use(badRequestHandler);
server.use(routeNotFoundMiddleWare);
server.use(genericErrorHandler);

init();

server.listen(PORT, () => console.log(`Server is runnin' on PORT ${PORT}`));
