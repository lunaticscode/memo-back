/**
 * @type {MiddlewareFunc}
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers["token"] || "";
  if (!token === "memo-app-token") {
    return res.status(401).json({ result: false });
  }
  next();
};

module.exports = authMiddleware;
