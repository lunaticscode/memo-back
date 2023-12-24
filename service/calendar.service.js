const getCalendarByType = async (userId = "", startDate, type = "month") =>
  await new Promise((resolve) => {
    if (!userId) {
      return resolve(null);
    }
    return resolve(true);
  });

const addCalendar = async (userId = "", targetDate) =>
  await new Promise((resolve) => {
    if (!userId || !targetDate) {
      return resolve(null);
    }
    return resolve(true);
  });

module.exports = {
  getCalendarByType,
  addCalendar,
};
