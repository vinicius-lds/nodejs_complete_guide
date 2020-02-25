const express = require('express')

const cartController = require('../controllers/cart-controller')
const userAuthenticationMiddleware = require('../middleware/user-authentication-middleware')

const router = express.Router()
const path = '/cart'

router.get(path, userAuthenticationMiddleware, cartController.renderCartPage)
router.post(path, userAuthenticationMiddleware, cartController.addProductToCart)

module.exports.router = router
