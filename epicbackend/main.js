const express = require("express");
const cors = require("cors");
const init = require("./db");
require("dotenv").config();
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const PORT = 3061;

const server = express();

server.use(express.json());
server.use(cors());
server.use("/", usersRoute);
server.use("/", loginRoute);

init();

server.listen(PORT, () => console.log(`Server is runnin' on PORT ${PORT}`));
