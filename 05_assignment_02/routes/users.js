const express = require('express')

const htmlPaths = require('../html-paths')

const router = express.Router()
const path = '/users'

router.get(path, (req, res, next) => res.sendFile(htmlPaths.users))

exports.router = router


