const {
  getCalendarByType,
  getCalendarOne,
  addCalendar,
} = require("../service/calendar.service");

const calendarController = require("express").Router();

calendarController.get("/", async (req, res) => {
  const { owner, targetDate } = req.query;
  console.log({ owner, targetDate });
  const getResult = await getCalendarOne({
    owner,
    targetDate: new Date(`${targetDate} 00:00:00`),
  });
  console.log({ getResult });
  if (!getResult) {
    return res.status(404).json({ result: false });
  } else {
    return res.status(200).json(getResult);
  }
});

calendarController.post("/", async (req, res) => {
  const { owner, targetDate, type } = req.body;
  if (!owner || !targetDate || !type) {
    return res.status(400).json({ result: false });
  }
  console.log(req.body);
  const calendarDataList = await getCalendarByType({
    owner,
    targetDate: new Date(targetDate),
    type,
  });
  if (!calendarDataList) {
    return res.status(400).json({ result: false });
  }
  return res.status(200).json(calendarDataList);
});

calendarController.post("/add", async (req, res) => {
  const { targetDate, type, owner, content } = req.body;
  if (!targetDate || !owner) {
    return res.status(400).json({ result: false });
  }
  const addResult = await addCalendar({
    owner,
    targetDate: new Date(`${targetDate} 00:00:00`),
    content,
  });
  if (!addResult) {
    return res.status(500).json({ result: false });
  }
  if (addResult) {
    return res.status(201).json({ result: true });
  }
});

module.exports = calendarController;
