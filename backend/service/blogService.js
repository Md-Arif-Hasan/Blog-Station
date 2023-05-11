const blogRepo = require("../repository/blogRepo");
const blogDTO = require("../DTO/blogDTO");
const userService = require("../service/userService");


("use strict");

exports.getAllBlogs = async (offset, limit) => {
  const fetchedBlogs = await blogRepo.getAllBlogs(offset, limit);
  if (!fetchedBlogs.rows.length) {
    throw Object.assign(new Error("No blog in users table!"), {
      statusCode: 404,
    });
  }
  return {status: 200, message: fetchedBlogs };
};


exports.getBlogById = async (blogId) => {
  const fetchedBlog = await blogRepo.getBlogById(blogId);

  if (!fetchedBlog) {
    throw Object.assign(new Error("Blog is not found!"), { statusCode: 404 });
  } 
    return {status: 200, message: new blogDTO(fetchedBlog) };
};


exports.getBlogsByAuthorId = async (authorId, offset, limit) => {
  const fetchedBlogs = await blogRepo.getBlogsByAuthorId(authorId, offset, limit);

  if (!fetchedBlogs.rows.length) {
    throw Object.assign(new Error("Blog is not found!"), { statusCode: 404 });
  } 
    return {status: 200, message:fetchedBlogs};
};

  
exports.createBlog = async (blog, username) => {

  const authorExists = await userService.getUserByUsername(username);
  if(authorExists){
    blog.authorId = authorExists.message.id;
  const createdBlog = await blogRepo.createBlog(blog);
  return {status: 201, message: createdBlog };
  }
};


exports.updateBlog = async (blogId, title, description) => {

  const updatedBlog = await blogRepo.updateBlog(blogId, title, description);

  if (!updatedBlog) {
    throw Object.assign(new Error("Blog not found!"), { statusCode: 404 });
  }
  return {status: 200, message: "Blog updated successfully" };
};

exports.deleteBlog = async (blogId) => {
  const deletedBlog = await blogRepo.deleteBlog(blogId);
  if (deletedBlog) return { status: 200, message: "Blog deleted successfully" };
  throw Object.assign(new Error("Blog not found!"), { statusCode: 404 });
};
