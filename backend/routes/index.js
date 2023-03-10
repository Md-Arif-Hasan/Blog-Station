const userRouter = require("./userRoutes");
const router = require("express").Router();

router.use("/api/v1/users", userRouter);

module.exports = router;