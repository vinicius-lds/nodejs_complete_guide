const express = require('express')

const loginController = require('../controllers/login-controller')

const router = express.Router()
const path = '/login'

router.get(path, loginController.renderLoginPage)
router.post(path, loginController.postLogin)

module.exports.router = router
