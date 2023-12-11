require("dotenv").config();
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("exec db-connection.....");
module.exports = connection;
