const productDao = require('../data/product-dao')


module.exports.renderIndexPage = (req, res, next) => {
    productDao.fetchAll()
        .then(products => {
            console.log('renderIndexPage', products)
            res.render('shop/index', {
                pageTitle: 'Index',
                path: '/',
                prods: products
            })
        }).catch(err => console.error(err))
}
