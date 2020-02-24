const ProductDao = require('../data/product-dao')
const pageNotFoundController = require('./page-not-found-controller')

module.exports.renderProductPage = (req, res, next) => {
    const { id } = req.params
    console.log('aqui1')
    ProductDao.findById(id)
        .then(product => {
            console.log('aqui2')
            res.render('shop/product-detail', {
                pageTitle: product.title,
                path: '/products',
                product: product
            })
        }).catch(error => pageNotFoundController.renderPageNotFoundPage(req, res, next))
}
