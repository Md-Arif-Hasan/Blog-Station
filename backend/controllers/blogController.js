const blogService = require("../service/blogService");

('use strict');

exports.getAllBlogs = async (req, res) => {
  const data = await blogService.getAllBlogs();
  res.status(data.status).send(data.message);
};

exports.getBlogById = async (req, res) => {
  const data = await blogService.getBlogById(req.params.blogId);
  res.status(data.status).send(data.message);
};

exports.createBlog = async (req, res) => {
  const data = await blogService.createBlog(req.body);
  res.status(data.status).send(data.message);
};

exports.updateBlog = async (req, res) => {
  const blogId = req.params.blogId;
  const data = await blogService.updateBlog(blogId, req.body);
  res.status(data.status).send(data.message);
};

exports.deleteBlog= async (req, res) => {
  const blogId = req.params.blogId;
  const data = await blogService.deleteBlog(blogId);
  res.status(data.status).send(data.message);
};
