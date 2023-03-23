const express = require('express');

const router = express.Router();
const { authentication } = require('../middleware/authMiddleware');
const blogMiddleware = require('../middleware/blogMiddleware');
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlogs);
router.post('/', authentication, blogController.createBlog);

router.get('/:blogid', blogController.getBlogById);
router.put('/:blogid', authentication, blogMiddleware, blogController.updateBlog);
router.delete('/:blogid', authentication, blogMiddleware, blogController.deleteBlog);

module.exports = router;
