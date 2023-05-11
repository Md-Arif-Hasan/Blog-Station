const express = require("express");
const router = express.Router();
const {authentication} = require("../middleware/authMiddleware");
const blogMiddleware = require("../middleware/blogMiddleware");
const blogController = require("../controllers/blogController");

router.get("/", blogController.getAllBlogs);
router.post("/", authentication, blogController.createBlog);

router.get("/:blogId", blogController.getBlogById);
router.route('/author/:authorId').get(blogController.getBlogsByAuthorId);

router.put("/:blogId", authentication, blogMiddleware, blogController.updateBlog);
router.delete("/:blogId",authentication, blogMiddleware, blogController.deleteBlog);

module.exports = router;
