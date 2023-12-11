const authMiddleware = require("../middleware/auth.middleware");
const mainController = require("express").Router();
const userController = require("./user.controller");
const postController = require("./post.controller");

mainController.use("/user", userController);
mainController.use("/post", authMiddleware, postController);

module.exports = mainController;
