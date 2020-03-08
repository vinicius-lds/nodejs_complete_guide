const Product = require("../models/product-model");

module.exports.renderIndexPage = (req, res, next) => {
  const page = parseInt(req.query.page || 1);
  const state = {};
  Product.find()
    .count()
    .then(count => {
      state.count = count;
      return Product.find()
        .skip((page - 1) * 2)
        .limit(2);
    })
    .then(products => {
      res.render("shop/index", {
        pageTitle: "Index",
        path: "/",
        prods: products,
        totalProducts: state.count,
        hasNextPage: 2 * page < state.count,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(state.count / 2),
        currentPage: page
      });
    })
    .catch(err => next(new Error(err)));
};
