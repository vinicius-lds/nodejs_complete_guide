const ProductDao = require('../../data/product-dao')


module.exports.deleteProduct = (req, res, next) => {
    ProductDao
        .deleteById(req.body.productId)
        .then(r => {
            console.log(r)
            res.redirect('/admin/products')
        })
        .catch(e => {
            console.error(e)
            res.redirect('/admin/products')
        })
}
