const express = require("express");
const { handleUserRegister, handleUserLogin } = require("../controller/user");
const { handlePostMessage } = require("../controller/messageChat");
const route = express();

route.post("/register", handleUserRegister)
route.post("/login", handleUserLogin);
route.post("/message", handlePostMessage);


module.exports = route