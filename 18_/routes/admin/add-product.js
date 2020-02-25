const express = require("express");

const addProductController = require("../../controllers/admin/add-product-controller");
const addProductValidation = require("../../validations/admin/add-product-validation");
const userAuthenticationMiddleware = require("../../middleware/user-authentication-middleware");

const router = express.Router();
const path = "/add-product";

router.get(
  path,
  userAuthenticationMiddleware,
  addProductController.renderAddProductPage
);
router.post(
  path,
  userAuthenticationMiddleware,
  addProductValidation,
  addProductController.postProduct
);

module.exports.router = router;
