const authRouter = require("./authRouter");
const middleware = require("../middleware/authMiddleware");
const userRouter = require("./userRoutes");
const router = require("express").Router();

router.use("/users",middleware, userRouter);
router.use("/auth", authRouter);

module.exports = router;
