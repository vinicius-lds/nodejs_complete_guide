const Product = require('../models/product-model')
const pageNotFoundController = require('./page-not-found-controller')

module.exports.renderCartPage = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            console.log(cart)
            return cart.getProducts()
        })
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: products
            })
        })
        .catch(err => {
            console.error(err)
            pageNotFoundController.renderPageNotFoundPage(req, res, next)
        })
}

module.exports.addProductToCart  = (req, res, next) => {
    const fetchedData = {}
    req.user.getCart()
        .then(cart => {
            fetchedData.cart = cart
            return cart.getProducts({ where: { id: req.body.productId } })
        })
        .then(products => {
            if (products.length) {
                fetchedData.product = products[0]
                fetchedData.quantity = fetchedData.product.cartItem.quantity + 1
                return fetchedData.product
            } else {
                fetchedData.quantity = 1
                return Product.findByPk(req.body.productId)
            }
        })
        .then(product => {
            return fetchedData.cart.addProduct(product, { through: { quantity: fetchedData.quantity } })
        })
        .then(() => res.redirect('/cart'))
        .catch(err => {
            console.error(err)
            return res.redirect('/cart')
        })
}
