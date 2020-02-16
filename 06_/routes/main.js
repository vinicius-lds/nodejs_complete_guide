const express = require('express')

const htmlPaths = require('../html-paths')
const product = require('../data/product')

const router = express.Router()
const path = '/'

router.get(path, (req, res, next) => {
    // res.sendFile(htmlPaths.main)
    const products = product.getProducts()
    res.render('main', {
        pageTitle: 'Shop',
        path: path,
        activeShop: true,
        productCss: true,
        hasProducts: !!products,
        products: products
    })
})

exports.router = router