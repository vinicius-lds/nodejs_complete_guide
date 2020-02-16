const express = require('express')

const cartController = require('../controllers/cart-controller')

const router = express.Router()
const path = '/cart'

router.get(path, cartController.renderCartPage)

module.exports.router = router
