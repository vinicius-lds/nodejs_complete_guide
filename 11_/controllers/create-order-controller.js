const Order = require('../models/order-model')
const Cart = require('../models/cart-model')


module.exports.createOrder = (req, res, next) => {
    const fetchedData = {}
    req.user.getCart()
        .then(cart => {
            fetchedData.cart = cart
            return cart.getProducts()
        })
        .then(products => {
            fetchedData.products = products
            return req.user.createOrder()
        })
        .then(order => {
            fetchedData.order = order
            const orderItens = fetchedData.products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity }
                return product
            })
            return order.addProducts(orderItens)
        })
        .then(() => {
            fetchedData.cart.destroy()
        })
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => {
            console.error(err)
            res.redirect('/orders')
        })

}
