const { Category, Post } = require("../models");

// Find all users
exports.allCategory = async (req, res, next) => {
  const categories = await Category.findAll({
    include: [
      {
        as: "post",
        model: Post,
      },
    ],
  })
    .then((category) => {
      return res.status(200).json({ category });
    })
    .catch((error) => {
      console.log(error.toString());
      return res.status(400).send(error);
    });
};

// Find a single User With User Id
exports.findCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.status(200).send(category);
};
