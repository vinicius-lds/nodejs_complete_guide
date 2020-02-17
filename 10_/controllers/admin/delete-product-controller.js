const cart = require('../../data/cart')
const productDao = require('../../data/product-dao')


module.exports.deleteProduct = (req, res, next) => {
    console.log('req.body.productId', req.body.productId)
    cart.deleteItemsByProductId(req.body.productId)
    productDao.deleteById(req.body.productId)
    res.redirect('/admin/products')
}
