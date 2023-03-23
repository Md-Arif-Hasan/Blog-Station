const blogService = require('../service/blogService');
const { sendResponse } = require('../utils/contentNegotiation');

exports.getAllBlogs = async (req, res) => {
    const data = await blogService.getallBlogs(req);
    return sendResponse(req, res, data.status, data.message);
};

exports.getBlogById = async (req, res) => {
    const data = await blogService.getBlogById(req.params.blogid);
    return sendResponse(req, res, data.status, data.message);
};

exports.createBlog = async (req, res) => {
    const data = await blogService.createBlog(req.body);
    return sendResponse(req, res, data.status, data.message);
};

exports.updateBlog = async (req, res) => {
    const { blogid } = req.params;
    const data = await blogService.updateBlog(blogid, req.body);
    return sendResponse(req, res, data.status, data.message);
};

exports.deleteBlog = async (req, res) => {
    const { blogid } = req.params;
    const data = await blogService.deleteBlog(blogid);
    return sendResponse(req, res, data.status, data.message);
};
