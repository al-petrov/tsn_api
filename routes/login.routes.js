const Router = require("express");
const loginController = require("../controller/login.controller");
const router = new Router();

router.post("/login", loginController.myLogin);

module.exports = router;
