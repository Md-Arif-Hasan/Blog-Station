class BlogDTO {
    constructor(blog) {
        this.id = blog.id;
        this.title = blog.title;
        this.description = blog.description;
        this.updatedAt = blog.updatedAt;
        this.authorid = blog.authorid;
    }
  }
  module.exports = BlogDTO;