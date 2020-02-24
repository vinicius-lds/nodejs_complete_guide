const pageNotFoundController = require('./page-not-found-controller')
const Product = require('../models/product-model')

module.exports.renderCartPage = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(user.cart.items)
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: user.cart.items
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
            return req.user.addToCart(product)
        })
        .then((e) => {
            return res.redirect('/cart')
        })
        .catch(err => {
            console.error(err)
            return pageNotFoundController.renderPageNotFoundPage(req, res, next)
        })
}
