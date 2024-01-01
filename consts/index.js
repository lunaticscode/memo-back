require("dotenv").config();
const APP_TOKEN = process.env.APP_TOKEN || "memo-app-token";

const CALENDAR_LABELL_COLOR = {
  GREEN: "#67DC13",
  JAMONG: "#FF7600D4",
  YELLOW: "#ECE08A",
  BLACK: "#0c0c0c",
  RED: "#FF4A42",
  PURPLE: "#BA76E4",
  SKYBLUE: "#84A7E1",
};

Object.freeze(CALENDAR_LABELL_COLOR);

module.exports = {
  APP_TOKEN,
  CALENDAR_LABELL_COLOR,
};
