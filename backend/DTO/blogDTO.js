class BlogDTO {
    constructor(blog) {
        this.id = blog.id;
        this.title = blog.title;
        this.description = blog.description;
        this.updatedAt = blog.updatedAt;
        this.authorId = blog.authorId;
    }
  }
  module.exports = BlogDTO;