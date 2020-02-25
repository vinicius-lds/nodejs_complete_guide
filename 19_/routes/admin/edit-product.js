const express = require("express");

const editProductController = require("../../controllers/admin/edit-product-controller");
const editProductValidation = require("../../validations/admin/edit-product-validation");
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
  editProductValidation,
  editProductController.postProduct
);

module.exports.router = router;
