const {Blog} = require("../models/index");

("use strict");

exports.getAllBlogs = async (offset, limit) => {
  const allBlogs = await Blog.findAll({
    include : ["author"],
    offset,
    limit
  });
  return allBlogs;
};

exports.getBlogById = async (blogId) => {
  const fetchedBlog = await Blog.findOne({
    include : ["author"],
    where: {
      id: blogId,
    },
  });
  return fetchedBlog;
};

exports.createBlog = async (blog) => {
    const createdBlog = await Blog.create(blog);
    return createdBlog;
};

exports.updateBlog = async (blogId, title, description) => {
  const result = await Blog.update(
    { title, description },
    { where: { id: blogId } }
  );
  return result;
};

exports.deleteBlog = async (blogId) => {
  const blog = await Blog.destroy({
    where: {
      id: blogId,
    },
  });
  return blog;
};
