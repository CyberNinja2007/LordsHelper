const { Router } = require("express");
const userController = require("../controllets/userController.js");

const router = new Router();

router.post("/registration", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/auth", userController.check);

module.exports = router;
