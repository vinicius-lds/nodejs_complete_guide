const ProductModel = require('../../models/product-model')


module.exports.renderAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
}

module.exports.postProduct = (req, res, next) => {
    ProductModel.create({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description  
    })
    res.redirect('/admin/products')
}
