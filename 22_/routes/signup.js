const express = require('express')

const signupController = require('../controllers/signup-controller')
const signupValidation = require('../validations/signup-validation')

const router = express.Router()
const path = '/signup'

router.get(path, signupController.renderSignupPage)
router.post(path, signupValidation, signupController.postSignup)

module.exports.router = router
