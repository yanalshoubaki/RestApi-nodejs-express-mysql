const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// SignUp Function

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      var token = jwt.sign({ id: user.uid }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// SignIn Function

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      res.status(200).send({
        uid: user.uid,
        username: user.username,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
