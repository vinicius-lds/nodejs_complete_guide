const express = require("express");

const checkoutController = require("../../controllers/checkout/checkout-controller");
const userAuthenticationMiddleware = require("../../middleware/user-authentication-middleware");

const router = express.Router();
const path = "/";

router.get(
  path,
  userAuthenticationMiddleware,
  checkoutController.renderCheckoutPage
);

module.exports.router = router;
