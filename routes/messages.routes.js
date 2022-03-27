const Router = require("express");
const massagesController = require("../controller/messages.controller");
const router = new Router();

router.post("/messages", massagesController.createMessage);
router.get("/messages", massagesController.getMessages);
router.get("/messages/:id", massagesController.getOneMessage);
router.put("/messages", massagesController.updateMessage);
router.delete("/messages/:id", massagesController.deleteMessage);

module.exports = router;
