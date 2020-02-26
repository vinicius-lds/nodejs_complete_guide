const { body, check, validationResult } = require("express-validator");

const postValidation = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      errorMessage: validationResult(req)
        .array()
        .map(value => value.msg)
        .join(", "),
      validationErrors: validationResult(req).array(),
      oldInput: req.body,
      product: req.body,
      hasError: true
    });
  } else {
    return next();
  }
};

module.exports = [
  body("title")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Title must be alphanumeric"),
  check("image")
    .custom((_, { req }) => !!req.file)
    .withMessage("Image is required"),
  body("price")
    .isFloat()
    .withMessage("Price must be float"),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description must have at leat 5 characters"),
  postValidation
];
