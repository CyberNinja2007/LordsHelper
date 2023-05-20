const {Router} = require('express');
const userController = require('../controllets/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = new Router();

router.post('/registration', userController.register);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);


module.exports = router