require("dotenv").config();
const APP_TOKEN = process.env.APP_TOKEN || "memo-app-token";

const CALENDAR_LABELL_COLOR = {
  NETURAL_YELLOW: "#FFDE0052",
  NETURAL_GREEN: "#50FF0040",
  PINK: "#FF9799",
  GREEN: "#67DC13",
  JAMONG: "#FF7600D4",
  YELLOW: "#ECE08A",
  PURPLE: "#BA76E4",
  SKYBLUE: "#84A7E1",
  RED: "#FF4A42",
  BLACK: "#0c0c0c",
};

Object.freeze(CALENDAR_LABELL_COLOR);

module.exports = {
  APP_TOKEN,
  CALENDAR_LABELL_COLOR,
};
