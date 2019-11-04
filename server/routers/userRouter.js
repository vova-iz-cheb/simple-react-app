const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/", userController.create);
userRouter.put("/", userController.change);

module.exports = userRouter;
