const { User, Category, Post } = require("../models");

// Find all users
exports.allUsers = async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        as: "post",
        model: Post,
        include: [{ model: Category, as: "category" }],
      },
    ],
  })
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((error) => {
      console.log(error.toString());
      return res.status(400).send(error);
    });
};

// Find a single User With User Id
exports.findUser = async (req, res) => {
  console.log(req);
  const user = await User.findOne({
    include: [
      {
        as: "post",
        model: Post,
        include: [{ model: Category, as: "category" }],
      },
    ],
    where: {
      ID: req.body.id,
    },
  });
  res.status(200).send(user);
};
