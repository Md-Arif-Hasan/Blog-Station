const blogRepository = require("../../repository/blogRepo");
const Blog = require("../../models/blogModel");
const { blogDB } = require("../mockDatabase");

class createdBlog {
  constructor(blog) {
    this.title = blog.title;
    this.description = blog.description;
    this.authorId = blog.authorId;
    this.id = "1";
  }
}

describe("Blog repositoy - testing", () => {
  describe(" Get All blogs function: ", () => {
    it(" Return a list of blogs: ", async () => {
      const offset = 0;
      const limit = 3;
      jest
        .spyOn(Blog, "findAll")
        .mockImplementation(({ offset, limit }) =>
          blogDB.slice(offset, offset + limit)
        );

      const response = await blogRepository.getAllBlogs(offset, limit);

      expect(Blog.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          offset,
          limit,
        })
      );
      expect(response.length).toBe(limit);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
            id: expect.any(String),
          }),
        ])
      );
    });

    it("Should throw an error if database query fails", async () => {
      const offset = 0;
      const limit = 3;
      const expectedError = new Error("Database error!");
      jest.spyOn(Blog, "findAll").mockRejectedValueOnce(expectedError);

      await expect(blogRepository.getAllBlogs(offset, limit)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe("Get blog by Id - testing", () => {
    it("A blog should be returned", async () => {
      const blogId = "1";
      const expectedResult = { ...blogDB[0] };

      jest.spyOn(Blog, "findOne").mockResolvedValueOnce(expectedResult);

      const response = await blogRepository.getBlogById(blogId);

      expect(Blog.findOne).toHaveBeenCalledWith({
        include: ["author"],
        where: { id: blogId },
      });
      expect(response).toEqual(expectedResult);
    });

    it("should throw an error if database query fails", async () => {
      const blogId = "1";
      const error = new Error("Error occured!");
      jest.spyOn(Blog, "findOne").mockRejectedValueOnce(error);

      await expect(blogRepository.getBlogById(blogId)).rejects.toThrow(error);
    });
  });

  describe("Create blog - testing", () => {
    it("Created blog should be returned", async () => {
      const blog = {
        title: "Blog no .1",
        description: "This is my first blog",
        authorId: "1",
      };

      const newBlog = new createdBlog(blog);


      jest.spyOn(Blog, 'create').mockResolvedValue(newBlog);

      const response = await blogRepository.createBlog(
      blog
      );

      expect(Blog.create).toHaveBeenCalledTimes(1);
      expect(Blog.create).toHaveBeenCalledWith(blog);
      expect(response).toBe(newBlog);
    });

    it("should throw an error if database query fails", async () => {
        const blog = {
            title: "Blog no .1",
            description: "This is my first blog",
            authorId: "1",
          };

      const newBlog = new createdBlog(blog);
          
      const error = new Error("Error occured!");
      jest.spyOn(Blog, "create").mockRejectedValueOnce(error);

      await expect(
        blogRepository.createBlog(newBlog)
      ).rejects.toThrow(error);
    });
  });

  describe("Delete blog function - testing", () => {
    it("A blog should be deleted", async () => {
      const blogId = "1";

      jest.spyOn(Blog, "destroy").mockResolvedValueOnce(1);

      const response = await blogRepository.deleteBlog(blogId);

      expect(Blog.destroy).toHaveBeenCalledWith({
        where: { id: blogId },
      });
      expect(response).toBe(1);
    });

    it("In case no blog exist, return 0", async () => {
      const blogId = "1";

      jest.spyOn(Blog, "destroy").mockResolvedValueOnce(0);

      const response = await blogRepository.deleteBlog(blogId);

      expect(Blog.destroy).toHaveBeenCalledWith({
        where: { id: blogId },
      });
      expect(response).toBe(0);
    });

    it(" Should throw an error if database query fails", async () => {
      const blogId = "1";
      const error = new Error("Error occured!");
      jest.spyOn(Blog, "destroy").mockRejectedValueOnce(error);

      await expect(blogRepository.deleteBlog(blogId)).rejects.toThrow(error);
    });
  });

  describe("Update blog function - testing ", () => {
    it("It should update a blog", async () => {
      const blogId = "1";
      const title = "Blog no.1";
      const description = "This is my first blog";

      jest.spyOn(Blog, "update").mockResolvedValueOnce([]);

      const blog = await blogRepository.updateBlog(blogId, title, description);

      expect(Blog.update).toHaveBeenCalledWith(
        { title, description },
        { where: { id: blogId } }
      );
    });

    it("return false if blog doesnt exits", async () => {
      const blogId = "1";
      const title = "Blog no.1";
      const description = "This is my first blog";

      jest.spyOn(Blog, "update").mockResolvedValueOnce([0]);

      const blog = await blogRepository.updateBlog(blogId, title, description);

      expect(Blog.update).toHaveBeenCalledWith(
        { title, description },
        { where: { id: blogId } }
      );
      expect(blog[0]).toBe(0);
    });

    it("should throw an error if there is an error in the database query", async () => {
      const blogId = "1";
      const title = "Blog no.1";
      const description = "This is my first blog";

      const expectedError = new Error("Database error");
      jest.spyOn(Blog, "update").mockRejectedValueOnce(expectedError);

      await expect(
        blogRepository.updateBlog(blogId, title, description)
      ).rejects.toThrow(expectedError);
    });
  });
});
