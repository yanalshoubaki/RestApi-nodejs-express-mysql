const { Category, User, Post } = require("../models");

// Find all users
exports.allPost = async (req, res, next) => {
  const posts = await Post.findAll({
    include: [
      {
        as: "category",
        model: Category,
      },
      {
        as: "user",
        model: User,
      },
    ],
  })
    .then((post) => {
      return res.status(200).json({ post });
    })
    .catch((error) => {
      console.log(error.toString());
      return res.status(400).send(error);
    });
};

// Find a single User With User Id
exports.findPost = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  res.status(200).send(post);
};
