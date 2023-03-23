const authRouter = require('./authRouter');
const blogRoute = require('./blogRouter');
const userRouter = require('./userRoutes');
const router = require('express').Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/blog', blogRoute);

module.exports = router;
