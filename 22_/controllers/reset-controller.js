const crypto = require("crypto");
const mailing = require("../mailing");
const User = require("../models/user-model");

module.exports.renderResetPage = (req, res, next) => {
  const errorMessages = req.flash("error");
  res.render("auth/reset", {
    pageTitle: "Reset password",
    path: "/reset",
    errorMessage: errorMessages.length ? errorMessages : undefined
  });
};

module.exports.renderNewPasswordPage = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      const errorMessages = req.flash("error");
      return res.render("auth/new-password", {
        pageTitle: "New Password",
        path: "/new-password",
        errorMessage: errorMessages.length ? errorMessages : undefined,
        passwordToken: token,
        userId: user._id.toString()
      });
    })
    .catch(err => next(new Error(err)));
};

module.exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return next(new Error(err));
    } else {
      const token = buffer.toString("hex");
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            req.flash("error", "No account with that email found");
            return res.redirect("/reset");
          } else {
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
          }
        })
        .then(() => {
          res.redirect("/");
          mailing.sendMail({
            to: req.body.email,
            subject: "Password reset",
            html: `
                            <p>You requested a password reset</p>
                            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
                        `
          });
        })
        .catch(err => next(new Error(err)));
    }
  });
};
