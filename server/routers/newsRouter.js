const express = require("express");
const newsController = require("../controllers/newsController");
const newsRouter = express.Router();

newsRouter.get("/", newsController.getAll);
newsRouter.get("/:id", newsController.getById);
newsRouter.post("/", newsController.create);
newsRouter.delete("/", newsController.delete);
newsRouter.put("/", newsController.change);

module.exports = newsRouter;
