const express = require('express')

const htmlPaths = require('../../html-paths')
const product = require('../../data/product')

const router = express.Router()
const path = '/add-product'

router.get(path, (req, res, next) => {
    // res.sendFile(htmlPaths.adminAddProduct)
    res.render('admin/add-product',{
        pageTitle: 'Add Product',
        path: `/admin${path}`,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
})

router.post(path, (req, res, next) => {
    product.addProduct({ title: req.body.title })
    res.redirect('/')
})

exports.router = router

