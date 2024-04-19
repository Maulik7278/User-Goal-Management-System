const express = require("express")
const user = require("./user");
const goal=require("./goal")

const user_router = express.Router()

user_router.use("/user", user);
user_router.use("/goal", goal);

module.exports = user_router