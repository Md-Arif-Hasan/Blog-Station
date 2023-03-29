const blogRepo = require("../repository/blogRepo");
const { blogValidation } = require("../utils/blogValidation");
const blogDTO = require("../DTO/blogDTO");
const { paginate } = require("../utils/pagination");

("use strict");

exports.getAllBlogs = async (req) => {
  const { offset, limit } = paginate(req);
  const fetchedBlogs = await blogRepo.getAllBlogs(offset, limit);
  if (!fetchedBlogs.length) {
    throw Object.assign(new Error("No blog in users table!"), {
      statusCode: 404,
    });
  }
  return { status: 200, message: fetchedBlogs };
};

exports.getBlogById = async (blogId) => {
  const fetchedBlog = await blogRepo.getBlogById(blogId);

  if (!fetchedBlog) {
    return { statusCode: 404, message: "Blog is not found" };
  } 
    return { status: 200, message: new blogDTO(fetchedBlog) };
};

exports.createBlog = async (blog) => {
  const blogInfoChecker = blogValidation(blog.title, blog.description);
  if (!blogInfoChecker.validity)
    return { status: 400, message: blogInfoChecker.message };

  const createdBlog = await blogRepo.createBlog(blog);
  return { status: 201, message: createdBlog };
};


exports.updateBlog = async (blogId, title, description) => {

  const blogInfoChecker = blogValidation(title, description);
  if (!blogInfoChecker.validity)
    return { status: 400, message: blogInfoChecker.message };

  const updatedBlog = await blogRepo.updateBlog(blogId, title, description);

  if (!updatedBlog) {
    throw Object.assign(new Error("Blog not found!"), { statusCode: 404 });
  }
  return { status: 200, message: "Blog updated successfully" };
};

exports.deleteBlog = async (blogId) => {
  const deletedBlog = await blogRepo.deleteBlog(blogId);
  if (deletedBlog) return { status: 200, message: "Blog deleted successfully" };
  throw Object.assign(new Error("Blog not found!"), { statusCode: 404 });
};
