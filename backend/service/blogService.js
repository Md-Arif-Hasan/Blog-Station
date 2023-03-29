const blogRepo = require("../repository/blogRepo");
const {blogValidation} = require("../utils/blogValidation");
const blogDTO = require("../DTO/blogDTO");
const {paginate} = require("../utils/pagination");

('use strict');

exports.getAllBlogs = async (req) => {
  try {
    const {offset, limit} = paginate(req);
    const fetchedBlogs = await blogRepo.getAllBlogs(offset,limit);
    if (!fetchedBlogs.length) {
      return { status: 404, message: "No blog in users table!" };
    }
    return { status: 200, message: fetchedBlogs };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};

exports.getBlogById = async (blogId) => {
  try {
    const fetchedBlog = await blogRepo.getBlogById(blogId);

    if (!fetchedBlog) {
      return { status: 404, message: "Thi Blog doesn't exist in database!" };
    }
    return { status: 200, message: new blogDTO(fetchedBlog) };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};


exports.createBlog = async (blog) => {
  const blogInfoChecker = blogValidation(blog.title, blog.description);
  if (!blogInfoChecker.validity) return { status: 400, message: blogInfoChecker.message };
  
  try {
    const createdBlog = await blogRepo.createBlog(blog);
    return { status: 201, message: createdBlog };
  } catch (error) {
    return {
      status: 500,
      message:  `${error.errors[0].message}`
    };
  }
};

exports.updateBlog = async (blogId, blog) => {
  try {
 
   const title = blog.title;
   const description = blog.description; 

    if(!title && !description){
      return { status: 400, message: "Title & description aren't provided!" };
    }
    const updatedBlog = await blogRepo.updateBlog(blogId, title, description);

    if (!updatedBlog) {
      return { status: 404, message: "Blog not found!" };
    }
    return { status: 200, message: "Blog updated successfully" };
  } catch (error) {
   return { status: 500, message: `It's a ${error.name}`};
  }
};



exports.deleteBlog = async (blogId) => {
  try {
    const deletedBlog = await blogRepo.deleteBlog(blogId);
    if (deletedBlog)
      return { status: 200, message: "Blog deleted successfully" };
    else return { status: 404, message: "Blog not found" };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};
