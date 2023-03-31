const blogService = require("../service/blogService");
const { sendResponse } = require("../utils/contentNegotiation");
const { blogValidation } = require("../utils/blogValidation");
const { paginate } = require("../utils/pagination");

("use strict");

exports.getAllBlogs = async (req, res, next) => {
  try {
    const { offset, limit } = paginate(req);
    const allBlogs = await blogService.getAllBlogs(offset, limit);
    return sendResponse(req, res, allBlogs.status, allBlogs.message);
  } catch (error) {
    next(error);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const oneBlog = await blogService.getBlogById(req.params.blogId);
    return sendResponse(req, res, oneBlog.status, oneBlog.message);
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;

    blogValidation(title, description);

    const createdBlog = await blogService.createBlog(req.body);
    return sendResponse(req, res, createdBlog.status, createdBlog.message);
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const title = req.body.title;
    const description = req.body.description;

    blogValidation(title, description);

    const updatedBlog = await blogService.updateBlog(
      blogId,
      title,
      description
    );
    res.status(updatedBlog.status).send(updatedBlog.message);
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const deletedBlog = await blogService.deleteBlog(blogId);
    res.status(deletedBlog.status).send(deletedBlog.message);
  } catch (error) {
    next(error);
  }
};
