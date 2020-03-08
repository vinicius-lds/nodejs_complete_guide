const express = require("express");

const productController = require("../../controllers/admin/product-controller");
const userAuthenticationMiddleware = require("../../middleware/user-authentication-middleware");

const router = express.Router();
const path = "/product";

router.delete(
  `${path}/:productId`,
  userAuthenticationMiddleware,
  productController.deleteProduct
);

module.exports.router = router;
