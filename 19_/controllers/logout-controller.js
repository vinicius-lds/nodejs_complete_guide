module.exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(new Error(err));
    } else {
      return res.redirect("/");
    }
  });
};
