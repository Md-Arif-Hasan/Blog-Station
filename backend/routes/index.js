const router = require('express').Router();
const authRouter = require('./authRouter');
const blogRoute = require('./blogRouter');
const userRouter = require('./userRoutes');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/blog', blogRoute);

module.exports = router;
