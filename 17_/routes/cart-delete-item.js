const express = require('express')

const cartDeleteItemController = require('../controllers/cart-delete-item-controller')
const userAuthenticationMiddleware = require('../middleware/user-authentication-middleware')

const router = express.Router()
const path = '/cart-delete-item'

router.post(path, userAuthenticationMiddleware, cartDeleteItemController.deleteItem)

module.exports.router = router
