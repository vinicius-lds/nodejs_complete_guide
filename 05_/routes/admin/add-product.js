const express = require('express')

const htmlPaths = require('../../html-paths')

const router = express.Router()
const path = '/add-product'

router.get(path, (req, res, next) => {
    res.sendFile(htmlPaths.adminAddProduct)
})

router.post(path, (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

exports.router = router

