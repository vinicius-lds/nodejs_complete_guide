const express = require('express')

const loginController = require('../controllers/login-controller')
const loginValidation = require('../validations/login-validation')

const router = express.Router()
const path = '/login'

router.get(path, loginController.renderLoginPage)
router.post(path, loginValidation, loginController.postLogin)

module.exports.router = router
