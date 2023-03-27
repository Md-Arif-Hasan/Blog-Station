const userService = require('../service/userService');
const blogService = require('../service/blogService');

const blogMiddleware = async (req, res, next) => {
    const { username } = req;
    const { blogId } = req.params;
    try {
        const user = await userService.getUserByUsername(username);
        const blog = await blogService.getBlogById(blogId);

        const userId = user.message.id;
        const authorId = blog.message.authorid;
        if (userId === authorId) next();
        else return res.status(403).send('Access denied!');
    } catch (err) {
        return res.status(400).send('Unhandled error');
    }
    return 0;
};

module.exports = blogMiddleware;
