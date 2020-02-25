const express = require('express')

const editProductController = require('../../controllers/admin/edit-product-controller')
const userAuthenticationMiddleware = require('../../middleware/user-authentication-middleware')

const router = express.Router()
const path = '/edit-product'

router.get(`${path}/:id`, userAuthenticationMiddleware, editProductController.renderEditProductPage)
router.post(path, userAuthenticationMiddleware, editProductController.postProduct)

module.exports.router = router

