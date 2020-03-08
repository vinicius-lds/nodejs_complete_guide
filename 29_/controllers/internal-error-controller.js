module.exports.renderInternalErrorPage = (req, res, next) => {
  return res.status(500).render("500", {
    pageTitle: "Internal Error",
    path: undefined
  });
};
