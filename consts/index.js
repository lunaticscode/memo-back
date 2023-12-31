require("dotenv").config();
const APP_TOKEN = process.env.APP_TOKEN || "memo-app-token";

const CALENDAR_LABELL_COLOR = {
  GREEN: "#32F33A",
  JAMONG: "#FF7700",
  YELLOW: "#FFD700",
  BLACK: "#0c0c0c",
  RED: "#FF4A42",
  PURPLE: "#DE4EFF",
  SKYBLUE: "#4FE6FF",
};

Object.freeze(CALENDAR_LABELL_COLOR);

module.exports = {
  APP_TOKEN,
  CALENDAR_LABELL_COLOR,
};
