const blogController = require("../../controllers/blogController");
const blogService = require("../../service/blogService");
const { sendResponse } = require("../../utils/contentNegotiation");

const { blogDB } = require("../mockDatabase");

jest.mock("../../utils/userInfoValidation");
jest.mock("../../utils/contentNegotiation");

describe("Blog controller - testing", () => {
  describe("Get all blogs function testing", () => {
    it("Should get a response from service", async () => {
      const req = {
        query: {
          offset: 0,
          limit: 3,
        },
      };

      const expectedResponse = {
        status: 200,
        message: blogDB,
      };
      const res = {};
      const next = jest.fn();

      jest
        .spyOn(blogService, "getAllBlogs")
        .mockReturnValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await blogController.getAllBlogs(req, res, next);

      expect(blogService.getAllBlogs).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);
    });

    it("Should call the error handler", async () => {
      const req = {
        query: {
          offset: 0,
          limit: 3,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Something went wrong");
      jest
        .spyOn(blogService, "getAllBlogs")
        .mockRejectedValueOnce(expectedError);

      await blogController.getAllBlogs(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("getBlogById method", () => {
    it("should call service and return a response", async () => {
      const req = {
        params: {
          blogId: "1",
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: blogDB[0],
      };
      jest
        .spyOn(blogService, "getBlogById")
        .mockResolvedValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await blogController.getBlogById(req, res, next);

      expect(blogService.getBlogById).toHaveBeenCalledWith(req.params.blogId);
      expect(blogService.getBlogById).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("should throws an error", async () => {
      const req = {
        params: {
          blogId: "1",
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Something went wrong");
      jest
        .spyOn(blogService, "getBlogById")
        .mockRejectedValueOnce(expectedError);

      await blogController.getBlogById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("updateBlog method - testing", () => {
    it("Should return a success response & updated data", async () => {
      const title = "Blog no.1";
      const description = "This is my first blog";
      const req = {
        params: {
          blogId: "1",
        },
        body: {
          title: title,
          description: description,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: blogDB[0],
      };

      jest
        .spyOn(blogService, "updateBlog")
        .mockResolvedValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await blogController.updateBlog(req, res, next);

      expect(blogService.updateBlog).toHaveBeenCalledWith(
        req.params.blogId,
        title,
        description
      );

      expect(sendResponse).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });
  });

  describe("Delete blog - testing", () => {
    it("should return a success response", async () => {
      const blogId = "1";
      const req = {
        params: {
          blogId,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: "Blog deleted successfully",
      };

      jest
        .spyOn(blogService, "deleteBlog")
        .mockResolvedValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await blogController.deleteBlog(req, res, next);

      expect(blogService.deleteBlog).toHaveBeenCalledWith(req.params.blogId);
      expect(response).toBe(expectedResponse);
    });
  });
});
