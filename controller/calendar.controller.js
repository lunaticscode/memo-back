const { CALENDAR_LABELL_COLOR } = require("../consts");
const {
  getCalendarByType,
  getCalendarOne,
  addCalendar,
  updateCalendar,
  deleteCalendar,
} = require("../service/calendar.service");

const calendarController = require("express").Router();

calendarController.get("/label", async (req, res) => {
  res.set("Cache-control", "public, max-age=10");
  return res.status(200).json(CALENDAR_LABELL_COLOR);
});

calendarController.get("/", async (req, res) => {
  const { owner, targetDate } = req.query;
  console.log({ owner, targetDate });
  console.log(new Date(`${targetDate} 00:00:00`));
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
  /**
   * @type {{owner: string, targetDate: string, type: string}}
   */
  const { owner, targetDate, type } = req.body;
  if (!owner || !targetDate || !type) {
    return res.status(400).json({ result: false });
  }

  console.log(targetDate);
  const calendarDataList = await getCalendarByType({
    owner,
    targetDate: new Date(`${targetDate} 00:00:00`),
    type,
  });
  if (!calendarDataList) {
    return res.status(400).json({ result: false });
  }
  return res.status(200).json(calendarDataList);
});

calendarController.post("/add", async (req, res) => {
  const { targetDate, owner, content, label = "GREEN" } = req.body;
  if (!targetDate || !owner) {
    return res.status(400).json({ result: false });
  }
  const addResult = await addCalendar({
    owner,
    targetDate: new Date(`${targetDate} 00:00:00`),
    content,
    label,
  });
  if (!addResult) {
    return res.status(500).json({ result: false });
  }
  if (addResult) {
    return res.status(201).json({ result: true });
  }
});

calendarController.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { content, label } = req.body;
  if (!id || !content || !label) {
    return res.status(400).json({ result: false });
  }
  const updateResult = await updateCalendar({ id, content, label });
  if (!updateResult) {
    return res.status(500).json({ result: false });
  }
  return res.status(200).json({ result: true });
});

calendarController.delete("/:id", async (req, res) => {
  const targetId = req.params.id;
  if (!targetId) {
    return res.status(400).json({ result: false });
  }
  const deleteResult = await deleteCalendar({ targetId });
  if (!deleteResult) {
    return res.status(500).json({ result: false });
  }
  return res.status(200).json({ result: true });
});

module.exports = calendarController;
