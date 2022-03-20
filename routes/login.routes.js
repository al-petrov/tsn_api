const Router = require('express')
const loginController = require('../controller/login.controller')
const userController = require('../controller/user.controller')
const router = new Router()

router.post('/login', loginController.myLogin)


module.exports = router 