const { CALENDAR_LABELL_COLOR } = require("../consts");
const dbConnection = require("../dbInit");

/**
 *
 * @param {{owner: string, targetDate: Date}} param0
 * @returns
 */
const getCalendarOne = async ({ owner, targetDate }) =>
  await new Promise((resolve) => {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const date = targetDate.getDate();

    dbConnection.query(
      "select * from calendar where targetDate between ? and ?",
      [new Date(year, month, date), new Date(year, month, date, 23, 59, 59)],
      (err, result) => {
        if (err) {
          console.log(err);
          return resolve(null);
        }
        return resolve(result);
      }
    );
  });

const getCalendarByType = async ({ owner = "", targetDate, type = "day" }) =>
  await new Promise((resolve) => {
    if (type === "day") {
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();
      const firstDate = new Date(year, month, 1);
      const firstDay = firstDate.getDay();
      const monthlyFirstDate = new Date(
        firstDate.getTime() - 3600 * 24 * 1000 * firstDay
      );

      const lastDate = new Date(year, month + 1, 0);
      const lastDay = lastDate.getDay();
      const monthlyLastDate = new Date(
        lastDate.getTime() + 3600 * 24 * 1000 * (6 - lastDay)
      );

      dbConnection.query(
        "select * from calendar where targetDate between ? and ?",
        [monthlyFirstDate, monthlyLastDate],
        (err, result) => {
          if (err) {
            console.log(err);
            return resolve(null);
          } else {
            return resolve(result);
          }
        }
      );
    }
    if (type === "week") {
      const targetDateDay = date.getDay();
      const weeklyFirstDate = new Date(
        date.getTime() - 3600 * 24 * 1000 * targetDateDay
      );
      const weeklyLastDate = new Date(
        weeklyFirstDate.getTime() + 3600 * 24 * 1000 * 7
      );
      dbConnection.query(
        "select * from calendar where targetDate between ? and ?",
        [weeklyFirstDate, weeklyLastDate],
        (err, result) => {
          if (err) {
            console.log(err);
            return resolve(null);
          } else {
            return resolve(result);
          }
        }
      );
    }
  });

const addCalendar = async ({ owner = "", targetDate, content, label }) =>
  await new Promise((resolve) => {
    dbConnection.query(
      "insert into calendar (owner, targetDate, content, label) values (?, ?, ?, ?)",
      [
        owner,
        targetDate,
        content,
        CALENDAR_LABELL_COLOR[label] || CALENDAR_LABELL_COLOR.GREEN,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return resolve(null);
        } else {
          return resolve(true);
        }
      }
    );
  });

const updateCalendar = async ({ content, label, id }) =>
  await new Promise((resolve) => {
    dbConnection.query(
      "update calendar set `content` = ?, `label` = ? where id = ?;",
      [content, CALENDAR_LABELL_COLOR[label], id],
      (err, result) => {
        if (err) {
          console.log(err);
          return resolve(null);
        } else {
          return resolve(true);
        }
      }
    );
  });

const deleteCalendar = async ({ targetId }) =>
  await new Promise((resolve) => {
    dbConnection.query(
      "delete from calendar where id = ?",
      [targetId],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
module.exports = {
  getCalendarByType,
  addCalendar,
  getCalendarOne,
  updateCalendar,
  deleteCalendar,
};
