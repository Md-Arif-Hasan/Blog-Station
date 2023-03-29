const blogService = require("../service/blogService");
const { sendResponse } = require("../utils/contentNegotiation");

("use strict");

exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogService.getAllBlogs(req);
    return sendResponse(req, res, allBlogs.status, allBlogs.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const oneBlog = await blogService.getBlogById(req.params.blogId);
    return sendResponse(req, res, oneBlog.status, oneBlog.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.createBlog = async (req, res) => {
  try {
    const createdBlog = await blogService.createBlog(req.body);
    return sendResponse(req, res, createdBlog.status, createdBlog.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const title = req.body.title;
    const description = req.body.description;
    const updatedBlog = await blogService.updateBlog(blogId,title,description);
    res.status(updatedBlog.status).send(updatedBlog.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const deletedBlog = await blogService.deleteBlog(blogId);
    res.status(deletedBlog.status).send(deletedBlog.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};
