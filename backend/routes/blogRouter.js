const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogController");

router.get("/", blogController.getAllBlogs).post("/", blogController.createBlog);
router.get("/:blogid", blogController.getBlogById).put("/:blogid", blogController.updateBlog).delete("/:blogid", blogController.deleteBlog);
module.exports = router;
