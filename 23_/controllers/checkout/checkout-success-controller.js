const createOrderController = require("../create-order-controller");

module.exports.renderCheckoutSuccessPage = (req, res, next) => {
  createOrderController.createOrder(req, res, next);
};
