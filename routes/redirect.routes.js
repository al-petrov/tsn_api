const Router = require("express");
const redirectController = require("../controller/redirect.controller");
const router = new Router();

router.get("/redirect/:id", redirectController.redirectMe);

module.exports = router;
