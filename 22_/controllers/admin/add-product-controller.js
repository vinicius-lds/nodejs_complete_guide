const Product = require("../../models/product-model");

module.exports.renderAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    errorMessage: undefined,
    validationErrors: [],
    hasError: false
  });
};

module.exports.postProduct = (req, res, next) => {
  new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.file.path.split("public\\").join(""),
    userId: req.session.user
  })
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(err => next(new Error(err)));
};
