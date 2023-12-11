const { getPostAll, createPost } = require("../service/post.service");

const postController = require("express").Router();

postController.get("/:owner", async (req, res) => {
  const owner = req.params.owner;
  const postDatas = await getPostAll(owner);
  return res.json({ result: true, data: postDatas || [] });
});

postController.get("/:id", (req, res) => {
  return res.json({ result: true });
});

postController.post("/", async (req, res) => {
  console.log(req.body);
  const { owner = "", content = "" } = req.body;
  if (!owner || !content) {
    return res.json({ result: false });
  }
  const insertResult = await createPost({ owner, content });
  if (!insertResult) {
    return res.json({ result: false });
  }
  return res.json({ result: true });
});

module.exports = postController;
