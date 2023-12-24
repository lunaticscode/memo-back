const calendarController = require("express").Router();

calendarController.get("/", (req, res) => {
  return res.json({ result: true });
});

module.exports = calendarController;
