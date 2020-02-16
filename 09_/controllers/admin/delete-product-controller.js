const cart = require('../../data/cart')
const product = require('../../data/product')


module.exports.deleteProduct = (req, res, next) => {
    console.log('req.body.productId', req.body.productId)
    cart.deleteItemsByProductId(req.body.productId)
    product.deleteById(req.body.productId)
    res.redirect('/admin/products')
}
