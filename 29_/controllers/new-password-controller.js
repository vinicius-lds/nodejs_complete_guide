const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

module.exports.postNewPassword = (req, res, next) => {
  const { password, userId, passwordToken } = req.body;
  const fetchedData = {};
  User.findOne({
    _id: userId,
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(user => {
      if (user) {
        fetchedData.user = user;
        return bcrypt.hash(password, 12);
      }
    })
    .then(hashedPassword => {
      if (hashedPassword) {
        fetchedData.user.password = hashedPassword;
        fetchedData.user.resetToken = undefined;
        fetchedData.user.resetTokenExpiration = undefined;
        return fetchedData.user.save();
      }
    })
    .then(() => {
      return res.redirect("/login");
    })
    .catch(err => next(new Error(err)));
};
