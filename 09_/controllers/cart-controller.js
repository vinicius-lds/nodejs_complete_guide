const cart = require('../data/cart')
const product = require('../data/product')
const pageNotFoundController = require('./page-not-found-controller')


module.exports.renderCartPage = (req, res, next) => {
    cart.fetchFirst(cartModel => {
        const productIds = cartModel.getItems().map(cartProductModel => cartProductModel.getProductId())
        product.findBulkById(productIds, productModels => {
            const cartProductsData = productModels.map(productModel => {
                const productQuantity = cartModel.getItems()
                    .filter(cartProductModel => cartProductModel.getProductId() === productModel.getId())
                    .map(cartProductModel => cartProductModel.getQuantity())[0]
                return { productData: productModel, qty: productQuantity }
            })
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProductsData
            })
        })
    })
}

module.exports.addProductToCart  = (req, res, next) => {
    product.findById(req.body.productId, cart.addProductToCart, () => {})
    res.redirect('/cart')
}
