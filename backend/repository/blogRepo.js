const Blog = require('../models/blogModel');
const { paginate } = require('../utils/pagination');

exports.getAllBlogs = async (req) => {
    try {
        const { offset, limit } = paginate(req);
        const allBlogs = await Blog.findAll({
            offset,
            limit,
            order: [['createdAt', 'ASC']],
        });
        return allBlogs;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.getBlogById = async (blogid) => {
    try {
        const fetchedBlog = await Blog.findOne({
            where: {
                id: blogid,
            },
        });
        return fetchedBlog;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.createBlog = async (blog) => {
    try {
        const createdBlog = await Blog.create(blog);
        return createdBlog;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.updateBlog = async (blogid, updatedTitle, updatedDescription) => {
    try {
        const result = await Blog.update(
            { title: updatedTitle, description: updatedDescription },
            { where: { id: blogid } }
        );
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.deleteBlog = async (blogid) => {
    try {
        const blog = await Blog.destroy({
            where: {
                id: blogid,
            },
        });
        return blog;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};
