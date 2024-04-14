require("dotenv").config();

const pg = require("pg");
const postgre = new pg.Client(process.env.PG_DATABASE_URI);
postgre.connect(async (err) => {
  if (err) {
    console.log("Failed to connect db " + err);
  } else {
    console.log("Connect to db done!");
  }
});
module.exports = postgre;
