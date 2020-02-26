const express = require('express')

const deleteProductController = require('../../controllers/admin/delete-product-controller')
const userAuthenticationMiddleware = require('../../middleware/user-authentication-middleware')

const router = express.Router()
const path = '/delete-product'

router.post(path, userAuthenticationMiddleware, deleteProductController.deleteProduct)

module.exports.router = router

