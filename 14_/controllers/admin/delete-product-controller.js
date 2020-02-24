const Product = require('../../models/product-model')


module.exports.deleteProduct = (req, res, next) => {
    Product
        .findByIdAndRemove(req.body.productId)
        .then(r => {
            res.redirect('/admin/products')
        })
        .catch(e => {
            console.error(e)
            res.redirect('/admin/products')
        })
}
