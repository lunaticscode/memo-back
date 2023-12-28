const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
require("./dbInit");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logMiddleware = require("./middleware/log.middleware");
const mainController = require("./controller");

app.get("/test", (req, res) => {
  return res.json({ result: true, message: "success test" });
});

app.use("/api", logMiddleware, mainController);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

// module.exports = app;
