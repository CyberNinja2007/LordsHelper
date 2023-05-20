const {Router} = require('express');
const userRouter = require('./userRouter.js');
const botRouter = require('./botRouter.js');

const router = new Router();

router.use('/user', userRouter);
router.use('/bots', botRouter);

module.exports = router