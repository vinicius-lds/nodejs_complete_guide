const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

module.exports.renderLoginPage = (req, res, next) => {
  const flashMessages = req.flash("error");
  return res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage:
      flashMessages && flashMessages.length ? flashMessages : undefined,
    validationErrors: [],
    oldInput: {}
  });
};

module.exports.postLogin = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email: email })
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      return req.session.save(() => res.redirect("/"));
    })
    .catch(err => next(new Error(err)));
};
