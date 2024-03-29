const Blog = require("../models/blogModel");

('use strict');

exports.getAllBlogs = async (offset,limit) => {
  try {
    const allBlogs = await Blog.findAll({offset, limit,  order: [['createdAt','ASC']] });
    return allBlogs;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getBlogById = async (blogId) => {
  try {
    const fetchedBlog = await Blog.findOne({
      where: {
        id: blogId,
      },
    });
    return fetchedBlog;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.createBlog = async (blog) => {
  try{
    const createdBlog = await Blog.create(blog);
    return createdBlog;
  }
  catch(err){
    console.log(err.stack);
    throw err;
  }
};



exports.updateBlog = async (blogId, title, description) => {
  try {
    const result = await Blog.update(
      { title,
        description
      },
      { where: { id: blogId } }
    );
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.deleteBlog = async (blogId) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: blogId,
      },
    });
    return blog;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

