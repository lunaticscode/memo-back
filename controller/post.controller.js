const {
  getPostAll,
  createPost,
  getPostDetail,
  setPostlike,
} = require("../service/post.service");

const postController = require("express").Router();

postController.get("/:owner", async (req, res) => {
  const owner = req.params.owner;
  const postDatas = await getPostAll(owner);
  return res.json({ result: true, data: postDatas || [] });
});

postController.get("/detail/:id", async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({ result: false });
  }
  const postData = await getPostDetail(postId);
  if (postData && postData[0]) {
    return res.status(200).json(postData[0]);
  } else {
    return res.status(404).json(null);
  }
});

postController.post("/", async (req, res) => {
  console.log(req.body);
  const { owner = "", content = "" } = req.body;
  if (!owner || !content) {
    return res.status(400).json({ result: false });
  }
  const insertResult = await createPost({ owner, content });
  if (!insertResult) {
    return res.json({ result: false });
  }
  return res.status(201).json({ result: true });
});

postController.put("/like", async (req, res) => {
  // console.log(req.body);
  const { owner, like, id } = req.body;
  if (!owner || !id || isNaN(like)) {
    return res.status(400).json({ result: false });
  }
  const updateLikeResult = await setPostlike({ owner, like, id });
  // console.log({ updateLikeResult });
  if (!updateLikeResult) {
    return res.status(400).json({ result: false });
  }
  return res.status(200).json({ result: true });
});

module.exports = postController;
