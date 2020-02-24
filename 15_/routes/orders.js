const express = require('express')

const ordersController = require('../controllers/orders-controller')
const userAuthenticationMiddleware = require('../middleware/user-authentication-middleware')

const router = express.Router()
const path = '/orders'

router.get(path, userAuthenticationMiddleware, ordersController.renderOrdersPage)

module.exports.router = router
