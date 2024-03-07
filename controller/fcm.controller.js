const fcmController = require("express").Router();
const { default: axios } = require("axios");
const { setFcmToken, getFcmTokens } = require("../service/fcm.service");
require("dotenv").config();

const fcmBroadCast = (tokenList, title, body) => {
  Promise.all(
    tokenList.map((token) => {
      axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: token,
          notification: {
            title,
            body,
          },
        },
        { headers: { Authorization: `key=${process.env.FCM_KEY}` } }
      );
    })
  );
};

fcmController.post("/", async (req, res) => {
  const { user, token } = req.body;
  if (!user || !token) {
    return res
      .status(400)
      .json({ result: false, msg: `(!) 잘못된 형식의 FCM 토큰 정보입니다.` });
  }
  console.log(user, token);
  const setTokenResult = await setFcmToken({ user, token });
  if (setTokenResult) {
    return res.status(204).json({ result: true });
  }
  return res
    .status(500)
    .json({ result: false, msg: "(!) 토큰 저장에 실패하였습니다." });
});

fcmController.post("/broadcast", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ result: false, msg: `(!) 잘못된 형식의 FCM 컨텐츠입니다.` });
  }
  const getTokens = await getFcmTokens();
  if (!getTokens)
    return res
      .status(500)
      .json({ result: false, msg: "(!) 토큰 정보를 불러올 수 없습니다." });
  const tokenList = getTokens
    .map((data) => data.token)
    .filter((elem, index, array) => array.indexOf(elem) === index);
  fcmBroadCast(tokenList, title, content);
  return res.json({ result: true });
});

module.exports = fcmController;
