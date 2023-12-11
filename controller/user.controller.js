const userController = require("express").Router();

userController.post("/signin", (req, res) => {
  const code = req.body.code || "";
  if (code === "kuhee" || code === "insoo") {
    return res.json({ result: true, token: "memo-app-token" });
  }
  return res.json({ result: false });
});

module.exports = userController;
