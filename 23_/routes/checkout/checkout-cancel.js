const express = require("express");

const checkoutCancelController = require("../../controllers/checkout/checkout-cancel-controller");
const userAuthenticationMiddleware = require("../../middleware/user-authentication-middleware");

const router = express.Router();
const path = "/cancel";

router.get(
  path,
  userAuthenticationMiddleware,
  checkoutCancelController.renderCheckoutCancelPage
);

module.exports.router = router;
