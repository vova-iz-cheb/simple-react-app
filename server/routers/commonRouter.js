const express = require("express");
const commonController = require("../controllers/commonController");
const commonRouter = express.Router();

commonRouter.post("/login", commonController.login);
commonRouter.post("/logout", commonController.logout);
commonRouter.post("/userdata", commonController.userdata);

module.exports = commonRouter;
