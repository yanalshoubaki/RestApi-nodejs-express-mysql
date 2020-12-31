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
    user_email: req.body.user_email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" });
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

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      res.status(200).send({
        user_id: user.id,
        username: user.username,
        user_email: user.email,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
