const Product = require("../models/product-model");
const pageNotFoundController = require("./page-not-found-controller");

module.exports.renderProductPage = (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then(product => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        path: "/products",
        product: product
      });
    })
    .catch(err => next(new Error(err)));
};
