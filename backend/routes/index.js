const userRouter = require("./userRoutes");
const router = require("express").Router();

router.use("/users", userRouter);

module.exports = router;
