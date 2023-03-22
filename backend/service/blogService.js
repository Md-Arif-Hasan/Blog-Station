const blogRepo = require("../repository/blogRepo");
const blogCheck = require("../utils/blogValidation");
const blogDTO = require("../DTO/blogDTO");

exports.getallBlogs = async (req) => {
  try {
    const fetchedBlogs = await blogRepo.getAllBlogs();
    if (fetchedBlogs.length == 0) {
      return { status: 404, message: "No blog in users table!" };
    }
    return { status: 200, message: fetchedBlogs };
  } catch (error) {
    return { status: 404, message: `Unhandled error` };
  }
};

exports.getBlogById = async (blogid) => {
  try {
    const fetchedBlog = await blogRepo.getBlogById(blogid);
    
    if (fetchedBlog.length == 0) {
      return { status: 404, message: "Thid Blog doesn't exist in database!" };
    }
    return { status: 200, message: new blogDTO(fetchedBlog) };
  } catch (error) {
    return { status: 404, message: `No Blog found` };
  }
};


exports.createBlog = async (blog) => {
 const blogInfoChecker = blogCheck.blogValidation(blog.title, blog.description);
 if (!blogInfoChecker.validity) return { status: 400, message: blogInfoChecker.message };
  try {
    await blogRepo.createBlog(blog);
    return { status: 200, message: "Blog created successfully" };
  } catch (error) {
    return {
      status: 500,
      message: `Service problem` 
    };
  }
};

exports.updateBlog = async (blogid, blog) => {
  try {
    if(!blogid){
      return { status: 400, message: "Invalid parameter!" };
    }

    title = blog.title;
    description = blog.description; 

    if(!title|| !description){
      return { status: 400, message: "Invalid request!" };
    }
    const result = await blogRepo.updateBlog(blogid, title, description);

    if (result == 0) {
      return { status: 404, message: "Blog not found!" };
    }
    return { status: 200, message: "Blog updated successfully" };
  } catch (error) {
   return { status: 409, message: `Unhandles Error!` };
  }
};



exports.deleteBlog = async (blogid) => {
  try {
    const result = await blogRepo.deleteBlog(blogid);
    if (result == 1)
      return { status: 200, message: "Blog deleted successfully" };
    else return { status: 404, message: "Blog not found" };
  } catch (error) {
    return { status: 409, message: `Unhandled error` };
  }
};
