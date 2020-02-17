const cartDao = require('../data/cart-dao')
const productDao = require('../data/product-dao')


module.exports.renderCartPage = (req, res, next) => {
    cart.fetchFirst(cartModel => {
        const productIds = cartModel.getItems().map(cartProductModel => cartProductModel.getProductId())
        productDao.findBulkById(productIds, productModels => {
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
    productDao.findById(req.body.productId)
        .then(productModel => {
            cart.addProductToCart(productModel)
            res.redirect('/cart')
        })
}
