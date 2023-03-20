const blogService = require("../service/blogService");

exports.getAllBlogs = async (req, res) => {
  const data = await blogService.getallBlogs();
  res.status(data.status).send(data.message);
};

exports.getBlogById = async (req, res) => {
  const data = await blogService.getBlogById(req.params.blogid);
  res.status(data.status).send(data.message);
};

exports.createBlog = async (req, res) => {
  const data = await blogService.createBlog(req.body);
  res.status(data.status).send(data.message);
};

exports.updateBlog = async (req, res) => {
  const blogid = req.params.blogid;
  const data = await blogService.updateBlog(blogid, req.body);
  res.status(data.status).send(data.message);
};

exports.deleteBlog= async (req, res) => {
  const blogid = req.params.blogid;
  const data = await blogService.deleteBlog(blogid);
  res.status(data.status).send(data.message);
};
