const pageNotFoundController = require('./page-not-found-controller')
const ProductDao = require('../data/product-dao')
const UserDao = require('../data/user-dao')

module.exports.renderCartPage = (req, res, next) => {
    ProductDao
        .fetchCartProducts(req.user.getCart())
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
    ProductDao
        .findById(req.body.productId)
        .then(product => {
            req.user.addToCart(product)
            return UserDao.saveCart(req.user)
        })
        .then(() => {
            return res.redirect('/cart')
        })
        .catch(err => {
            console.error(err)
            return pageNotFoundController.renderPageNotFoundPage(req, res, next)
        })
}
