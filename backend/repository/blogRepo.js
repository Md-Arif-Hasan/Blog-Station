const { Blog } = require("../models/index");

("use strict");

exports.getAllBlogs = async (offset, limit) => {
  const allBlogs = await Blog.findAndCountAll({
    include: ["author"],
    offset,
    limit,
    order: [["updatedAt", "DESC"]],
  });
  return allBlogs;
};

exports.getBlogById = async (blogId) => {
  const fetchedBlog = await Blog.findOne({
    include: ["author"],
    order: [["updatedAt", "DESC"]],
    where: {
      id: blogId,
    },
  });
  return fetchedBlog;
};

exports.getBlogsByAuthorId = async (authorId, offset, limit) => {

  console.log(offset+"   "+limit)
  const fetchedBlog = await Blog.findAndCountAll({
    include: ["author"],
    offset,
    limit,
    order: [["updatedAt", "DESC"]],
    where: { authorId: authorId },
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
