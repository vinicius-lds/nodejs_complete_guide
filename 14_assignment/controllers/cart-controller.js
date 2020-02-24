const pageNotFoundController = require('./page-not-found-controller')
const Product = require('../models/product-model')

module.exports.renderCartPage = (req, res, next) => {
    req.session.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: user.cart.items,
                isAuthenticated: req.session.isLoggedIn,
            })
        })
        .catch(err => {
            console.error(err)
            pageNotFoundController.renderPageNotFoundPage(req, res, next)
        })    
}

module.exports.addProductToCart  = (req, res, next) => {
    Product
        .findById(req.body.productId)
        .then(product => {
            return req.session.user.addToCart(product)
        })
        .then((e) => {
            return res.redirect('/cart')
        })
        .catch(err => {
            console.error(err)
            return pageNotFoundController.renderPageNotFoundPage(req, res, next)
        })
}
