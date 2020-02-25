const express = require('express')

const newPasswordController = require('../controllers/new-password-controller')

const router = express.Router()
const path = '/new-password'

router.post(path, newPasswordController.postNewPassword)

module.exports.router = router
