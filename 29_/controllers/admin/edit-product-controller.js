const pathUtils = require("../../utils/path-utils");
const fileUtils = require("../../utils/file-utils");
const Product = require("../../models/product-model");

module.exports.renderEditProductPage = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: true,
        product: product,
        errorMessage: undefined,
        validationErrors: []
      });
    })
    .catch(err => next(new Error(err)));
};

module.exports.postProduct = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
      if (req.file) {
        fileUtils.delete(pathUtils.buildFilePath("public", product.imageUrl));
        product.imageUrl = req.file.path.split("public\\").join("");
      }
      return product.save();
    })
    .then(() => {
      return res.redirect("/admin/products");
    })
    .catch(err => next(new Error(err)));
};
