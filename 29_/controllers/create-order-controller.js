const Order = require("../models/order-model");

module.exports.createOrder = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      const order = new Order({
        user: {
          name: user.name,
          userId: user
        },
        products: user.cart.items.map(item => {
          return {
            quantity: item.quantity,
            product: { ...item.productId._doc }
          };
        })
      });
      return order.save();
    })
    .then(() => {
      return req.session.user.clearCart();
    })
    .then(() => {
      return res.redirect("/orders");
    })
    .catch(err => next(new Error(err)));
};
