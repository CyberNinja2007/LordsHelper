const { Router } = require("express");
const botController = require("../controllets/botController.js");

const router = new Router();

router.get("/", botController.getAll);
router.get("/:id", botController.getOne);
router.post("/", botController.create);
router.post("/:id", botController.deleteOne);

module.exports = router;
