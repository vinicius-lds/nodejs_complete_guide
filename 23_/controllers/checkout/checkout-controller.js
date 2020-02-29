const stripe = require("stripe")("sk_test_p0iwFOJZGE9HDgcZmX3ZwlTL00ksW2a7Jm");

module.exports.renderCheckoutPage = (req, res, next) => {
  const state = {};
  req.session.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      state.user = user;
      return stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: user.cart.items.map(p => {
          return {
            name: p.productId.title,
            description: p.productId.description,
            amount: p.productId.price * 100,
            currency: "usd",
            quantity: p.quantity
          };
        }),
        success_url: `${req.protocol}://${req.get("host")}/checkout/success`,
        cancel_url: `${req.protocol}://${req.get("host")}/checkout/cancel`
      });
    })
    .then(session => {
      return res.render("shop/checkout", {
        path: "checkout",
        pageTitle: "Checkout",
        products: state.user.cart.items,
        totalSum: state.user.cart.items
          .map(product => product.productId.price * product.quantity)
          .reduce((acc, curr) => acc + curr, 0),
        sessionId: session.id
      });
    })
    .catch(err => next(new Error(err)));
};
