const pageNotFoundController = require("./page-not-found-controller");
const Product = require("../models/product-model");

module.exports.renderCartPage = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: user.cart.items
      });
    })
    .catch(err => next(new Error(err)));
};

module.exports.addProductToCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      return req.session.user.addToCart(product);
    })
    .then(e => {
      return res.redirect("/cart");
    })
    .catch(err => next(new Error(err)));
};
