const productDao = require('../../data/product-dao')
const ProductModel = require('../../models/product-model')


module.exports.renderAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

module.exports.postProduct = (req, res, next) => {
    productDao.save(ProductModel.of(req.body))
    res.redirect('/')
}
