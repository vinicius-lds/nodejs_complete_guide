const express = require("express");

const editProductController = require("../../controllers/admin/edit-product-controller");
const editProductValidation = require("../../validations/admin/edit-product-validation");
const fileUploadMiddleware = require("../../middleware/file-upload-middleware");
const userAuthenticationMiddleware = require("../../middleware/user-authentication-middleware");

const router = express.Router();
const path = "/edit-product";

router.get(
  `${path}/:id`,
  userAuthenticationMiddleware,
  editProductController.renderEditProductPage
);
router.post(
  path,
  userAuthenticationMiddleware,
  fileUploadMiddleware("image", {
    destination: "images",
    imageExtensions: { accept: ["jpg", "jpeg", "png"] }
  }),
  editProductValidation,
  editProductController.postProduct
);

module.exports.router = router;
