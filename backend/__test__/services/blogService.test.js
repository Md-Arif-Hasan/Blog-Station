const blogService = require("../../service/blogService");
const blogRepo = require("../../repository/blogRepo");
const blogDTO = require("../../DTO/blogDTO");

const { blogDB } = require("../mockDatabase");

jest.mock("../../DTO/blogDTO");

describe("Blog service - testing", () => {
  describe(" Get all blogs method - testing", () => {
    it(" Should return a list of users", async () => {
      const offset = 0;
      const limit = 3;

      const mockBlogs = blogDB;

      jest.spyOn(blogRepo, "getAllBlogs").mockResolvedValueOnce(mockBlogs);

      const response = await blogService.getAllBlogs(offset, limit);

      expect(blogRepo.getAllBlogs).toHaveBeenCalledWith(offset, limit);
      expect(response).toEqual({
        status: 200,
        message: mockBlogs,
      });
    });


    it("Should throw an error if the repository call fails", async () => {
      const offset = 0;
      const limit = 3;

      const fakeError = new Error("Internal server error");
      jest.spyOn(blogRepo, "getAllBlogs").mockRejectedValue(fakeError);

      await expect(blogService.getAllBlogs(offset, limit)).rejects.toThrow(
        fakeError
      );
    });

    it("Get no blog in table - test", async () => {
      const offset = 0;
      const limit = 3;

      const fakeError = new Error("No blog in users table!");
      jest.spyOn(blogRepo, "getAllBlogs").mockResolvedValue(0);
      await expect(blogService.getAllBlogs(offset, limit)).rejects.toThrow(
        fakeError
      );
    });
  });

  describe("Get Blog by Id method - testing ", () => {
    it("Should return a blog", async () => {
      const blogId = "1";
      const mockBlog = blogDB[1];
      jest.spyOn(blogRepo, "getBlogById").mockResolvedValueOnce(mockBlog);

      const response = await blogService.getBlogById(blogId);

      expect(blogRepo.getBlogById).toHaveBeenCalledWith(blogId);
      expect(response).toEqual({
        status: 200,
        message: new blogDTO(mockBlog),
      });
    });

    it("Should throw an error if the repository call fails", async () => {
      const blogId = "1";
      const fakeError = new Error("Internal server error");
      jest.spyOn(blogRepo, "getBlogById").mockRejectedValue(fakeError);

      await expect(blogService.getBlogById(blogId)).rejects.toThrow(fakeError);
    });

    it("Blog Id doesn't exist - test", async () => {
      const blogId = "1";
      const fakeError = new Error("Blog is not found!");
      jest.spyOn(blogRepo, "getBlogById").mockResolvedValue(0);
      await expect(blogService.getBlogById(blogId)).rejects.toThrow(fakeError);
    });
  });

  describe("Update blog method - testing", () => {
    it("Should update blog title & description - testing", async () => {
      const blogId = "1";
      const title = "Blog no 1";
      const description = "This is my first blog";

      jest.spyOn(blogRepo, "updateBlog").mockResolvedValue([1]);
      const expectedResponse = {
        status: 200,
        message: "Blog updated successfully",
      };

      const response = await blogService.updateBlog(blogId, title, description);

      expect(blogRepo.updateBlog).toHaveBeenCalledWith(
        blogId,
        title,
        description
      );
      expect(response).toEqual(expectedResponse);
    });

    it("Blog doesn't exist - test", async () => {
      const blogId = "1";
      const title = "Blog no 1";
      const description = "This is my first blog";

      const fakeError = new Error("Blog not found!");
      jest.spyOn(blogRepo, "updateBlog").mockResolvedValue(0);
      await expect(
        blogService.updateBlog(blogId, title, description)
      ).rejects.toThrow(fakeError);
    });
  });

  describe("Delete blog method - testing", () => {
    it("Should delete a specific blog ", async () => {
      const blogId = "1";

      jest.spyOn(blogRepo, "deleteBlog").mockResolvedValueOnce(1);

      const response = await blogService.deleteBlog(blogId);

      expect(blogRepo.deleteBlog).toHaveBeenCalledWith(blogId);
      expect(response).toEqual({
        status: 200,
        message: "Blog deleted successfully",
      });
    });
  });

  it("Blog ID doesn't exist - test", async () => {
    const blogId = "1";
    const fakeError = new Error("Blog not found!");
    jest.spyOn(blogRepo, "deleteBlog").mockResolvedValue(0);
    await expect(blogService.deleteBlog(blogId)).rejects.toThrow(fakeError);
  });
});
