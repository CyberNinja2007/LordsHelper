const { Router } = require("express");
const botController = require("../controllets/botController.js");

const router = new Router();

router.post("/", botController.create);
router.get("/", botController.getAll);
router.get("/:id", botController.getOne);

module.exports = router;
