const Product = require('../../models/product-model')


module.exports.deleteProduct = (req, res, next) => {
    Product
        .findByIdAndRemove({ id: req.body.productId, userId: req.session.user._id })
        .then(r => {
            res.redirect('/admin/products')
        })
        .catch(e => {
            console.error(e)
            res.redirect('/admin/products')
        })
}
