const authMiddleware = require("../middleware/auth.middleware");
const mainController = require("express").Router();
const userController = require("./user.controller");
const postController = require("./post.controller");
const calendarController = require("./calendar.controller");
const fcmController = require("./fcm.controller");

mainController.use("/user", userController);
mainController.use("/post", authMiddleware, postController);
mainController.use("/calendar", authMiddleware, calendarController);
mainController.use("/fcm", authMiddleware, fcmController);

module.exports = mainController;
