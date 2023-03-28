const blogService = require("../service/blogService");
const {sendResponse} = require("../utils/contentNegotiation");

('use strict');

exports.getAllBlogs = async (req, res) => {
  const allBlogs = await blogService.getAllBlogs(req);
  return sendResponse(req,res,allBlogs.status, allBlogs.message);
};

exports.getBlogById = async (req, res) => {
  const oneBlog = await blogService.getBlogById(req.params.blogId);
  return sendResponse(req,res,oneBlog.status, oneBlog.message);
};

exports.createBlog = async (req, res) => {
  const createdBlog = await blogService.createBlog(req.body);
  return sendResponse(req,res,createdBlog.status, createdBlog.message);
};

exports.updateBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const updatedBlog = await blogService.updateBlog(blogId, req.body);
  res.status(updatedBlog.status).send(updatedBlog.message);
};

exports.deleteBlog= async (req, res) => {
  const blogId = req.params.blogId;
  const deletedBlog = await blogService.deleteBlog(blogId);
  res.status(deletedBlog.status).send(deletedBlog.message);
};
