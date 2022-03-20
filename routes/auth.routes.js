const Router = require('express')
const authController = require('../controller/auth.controller')
const router = new Router()

router.get('/auth', authController.authMe)

module.exports = router 