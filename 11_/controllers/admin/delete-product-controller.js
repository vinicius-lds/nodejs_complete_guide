const cart = require('../../data/cart')
const ProductModel = require('../../models/product-model')


module.exports.deleteProduct = (req, res, next) => {
    console.log('req.body.productId', req.body.productId)
    // cart.deleteItemsByProductId(req.body.productId)
    ProductModel.destroy({ where: { id: req.body.productId } })
        .then(r => {
            console.log(r)
            res.redirect('/admin/products')
        })
        .catch(e => {
            console.error(e)
            res.redirect('/admin/products')
        })
}
