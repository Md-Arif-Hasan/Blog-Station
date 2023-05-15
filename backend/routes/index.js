const authRouter = require("./authRouter");
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");
const router = require("express").Router();

router.use("/users" , userRouter);
router.use("/auth", authRouter);
router.use("/blogs", blogRouter);

module.exports = router;
