const Blog = require("../models/blogModel");

("use strict");

exports.getAllBlogs = async (offset, limit) => {
  const allBlogs = await Blog.findAll({
    offset,
    limit,
    order: [["createdAt", "ASC"]],
  });
  return allBlogs;
};

exports.getBlogById = async (blogId) => {
  const fetchedBlog = await Blog.findOne({
    where: {
      id: blogId,
    },
  });
  return fetchedBlog;
};

exports.createBlog = async (blog) => {
  try {
    const createdBlog = await Blog.create(blog);
    return createdBlog;
  } catch (err) {
    throw Object.assign(new Error(err.errors[0].message), { statusCode: 400 });
  }
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
