const dbConnection = require("../dbInit");

const getFcmTokens = async () =>
  await new Promise((resolve) => {
    return dbConnection.query(`select token from fcm`, (err, result) => {
      if (err) {
        console.log(err);
        return resolve(err);
      }
      return resolve(result);
    });
  });
const setFcmToken = async ({ user, token }) =>
  await new Promise((resolve) => {
    console.log({ user, token });
    return dbConnection.query(
      "update fcm set `token` = ? where user = ?;",
      [token, user],
      (err, result) => {
        if (err) {
          console.log(err);
          return resolve(null);
        } else {
          return resolve(true);
        }
      }
    );
  });

module.exports = {
  setFcmToken,
  getFcmTokens,
};
