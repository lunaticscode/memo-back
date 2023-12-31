const { APP_TOKEN } = require("../consts");

/**
 * @type {MiddlewareFunc}
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers["token"] || "";
  if (token !== APP_TOKEN) {
    return res.status(401).json({ result: false });
  }
  next();
};

module.exports = authMiddleware;
