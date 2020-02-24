const express = require('express')

const signupController = require('../controllers/signup-controller')

const router = express.Router()
const path = '/signup'

router.get(path, signupController.renderSignupPage)
router.post(path, signupController.postSignup)

module.exports.router = router
