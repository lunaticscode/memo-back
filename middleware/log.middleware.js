/**
 * @type {MiddlewareFunc}
 */
const logMiddleware = (req, res, next) => {
  console.log("logging....");
  next();
};

module.exports = logMiddleware;
