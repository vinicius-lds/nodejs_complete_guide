const Product = require("../../models/product-model");

module.exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndRemove({
    id: req.body.productId,
    userId: req.session.user._id
  })
    .then(r => {
      res.redirect("/admin/products");
    })
    .catch(err => next(new Error(err)));
};
