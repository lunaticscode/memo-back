const authMiddleware = require("../middleware/auth.middleware");
const mainController = require("express").Router();
const userController = require("./user.controller");
const postController = require("./post.controller");
const calendarController = require("./calendar.controller");

mainController.use("/user", userController);
mainController.use("/post", authMiddleware, postController);
mainController.use("/calendar", authMiddleware, calendarController);

module.exports = mainController;
