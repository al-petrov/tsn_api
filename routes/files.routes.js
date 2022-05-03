const Router = require("express");
const filesController = require("../controller/files.controller");
const router = new Router();

router.post("/files", filesController.createFile);
router.get("/files", filesController.getFiles);
router.get("/files/:id", filesController.getOneFile);
router.put("/files", filesController.updateFile);
router.delete("/files/:id", filesController.deleteFile);

module.exports = router;
