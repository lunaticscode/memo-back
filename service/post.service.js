const dbConnection = require("../dbInit");

const getPostAll = async (owner) =>
  await new Promise((resolve) => {
    dbConnection.query(
      "select * from memo where owner = ? order by createdAt desc",
      [owner],
      (err, result) => {
        if (err) {
          console.log(err);
          return resolve(null);
        }
        console.log(result);
        return resolve(result);
      }
    );
  });

const getPostDetail = async () => await new Promise((resolve) => {});

const createPost = async ({ owner, content }) =>
  await new Promise((resolve) => {
    dbConnection.query(
      "insert into memo (owner, content) values (?, ?)",
      [owner, content],
      (err, result) => {
        if (err) {
          console.log(err);
          return resolve(null);
        } else {
          console.log(result);
          return resolve(true);
        }
      }
    );
  });

module.exports = {
  getPostAll,
  getPostDetail,
  createPost,
};
