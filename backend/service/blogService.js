const blogRepo = require('../repository/blogRepo');
const blogCheck = require('../utils/blogValidation');
const BlogDTO = require('../DTO/blogDTO');

exports.getAllBlogs = async (req) => {
    try {
        const fetchedBlogs = await blogRepo.getAllBlogs(req);
        if (!fetchedBlogs.length) {
            return { status: 404, message: 'No blog in users table!' };
        }
        return { status: 200, message: fetchedBlogs };
    } catch (error) {
        return { status: 404, message: 'Unhandled error' };
    }
};

exports.getBlogById = async (blogId) => {
    try {
        const fetchedBlog = await blogRepo.getBlogById(blogId);

        if (!fetchedBlog) {
            return { status: 404, message: "This Blog doesn't exist in database!" };
        }
        return { status: 200, message: new BlogDTO(fetchedBlog) };
    } catch (error) {
        return { status: 404, message: 'No Blog found' };
    }
};

exports.createBlog = async (blog) => {
    const blogInfoChecker = blogCheck.blogValidation(blog.title, blog.description);
    if (!blogInfoChecker.validity) return { status: 400, message: blogInfoChecker.message };
    try {
        await blogRepo.createBlog(blog);
        return { status: 200, message: 'Blog created successfully' };
    } catch (error) {
        return {
            status: 500,
            message: 'Service problem',
        };
    }
};

exports.updateBlog = async (blogId, blog) => {
    try {
        if (!blogId) {
            return { status: 400, message: 'Invalid parameter!' };
        }

        const { title, description } = blog;

        if (!title || !description) {
            return { status: 400, message: 'Invalid request!' };
        }
        const result = await blogRepo.updateBlog(blogId, title, description);

        if (!result) {
            return { status: 404, message: 'Blog not found!' };
        }
        return { status: 200, message: 'Blog updated successfully' };
    } catch (error) {
        return { status: 409, message: 'Unhandles Error!' };
    }
};

exports.deleteBlog = async (blogId) => {
    try {
        const result = await blogRepo.deleteBlog(blogId);
        if (result) return { status: 200, message: 'Blog deleted successfully' };
        return { status: 404, message: 'Blog not found' };
    } catch (error) {
        return { status: 409, message: 'Unhandled error' };
    }
};
