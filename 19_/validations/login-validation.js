const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");

const postValidation = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      path: "/login",
      errorMessage: validationResult(req)
        .array()
        .map(value => value.msg),
      validationErrors: validationResult(req).array(),
      oldInput: req.body
    });
  } else {
    return next();
  }
};

module.exports = [
  body("email")
    .custom(email =>
      User.findOne({ email: email }).then(user =>
        !!user ? true : Promise.reject()
      )
    )
    .withMessage("Email not found"),
  body("password")
    .custom((password, { req }) =>
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return bcrypt
            .compare(password, user.password)
            .then(r => r || Promise.reject());
        } else {
          return Promise.reject();
        }
      })
    )
    .withMessage("Invalid password"),
  postValidation
];
