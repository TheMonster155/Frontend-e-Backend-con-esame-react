const PORT = process.env.PORT || 3061;
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
//const genericErrorHandler = require("./middlewere/generiErroreMiddlewere");
const emailRoute = require("./routes/sendEmail");
const googleRoute = require("./routes/google");
const githubRoute = require("./routes/gitHub");
const productsBuy = require("./routes/productsBuy");
const stripe = require("./routes/stripe");
const notAllowIp = process.env.BANNEDIPS
  ? process.env.BANNEDIPS.split(",")
  : [];

const server = express();
require("dotenv").config();
console.log("Variabili di ambiente caricate:", {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
});

server.use("/uploads", express.static(path.join(__dirname, "/uploads")));
server.use("/", productsBuy);
server.use("/", stripe);
server.use(express.json());
server.use(cors());

//server.use(cors());
//server.use(blockIpMiddleware);
server.use(requestTimeMiddleware);
server.use("/", usersRoute);
server.use("/", loginRoute);
server.use("/", booksRoute);
server.use("/", CommentsRoute);
server.use("/", emailRoute);
server.use("/", googleRoute);
server.use("/", githubRoute);
server.use(badRequestHandler);
server.use(routeNotFoundMiddleWare);
//server.use(genericErrorHandler);

init();

server.listen(PORT, () => console.log(`Server is runnin' on PORT ${PORT}`));
