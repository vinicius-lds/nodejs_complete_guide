const express = require("express");

const checkoutSuccessController = require("../../controllers/checkout/checkout-success-controller");
const userAuthenticationMiddleware = require("../../middleware/user-authentication-middleware");

const router = express.Router();
const path = "/success";

router.get(
  path,
  userAuthenticationMiddleware,
  checkoutSuccessController.renderCheckoutSuccessPage
);

module.exports.router = router;
