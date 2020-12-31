const db = require("../models");
const User = db.user;

// Find all users
exports.allUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
};

// Find a single User With User Id
exports.findUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.status(200).send(user);
};
