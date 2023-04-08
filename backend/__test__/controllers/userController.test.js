const userController = require("../../controllers/userController");
const userService = require("../../service/userService");
const { sendResponse } = require("../../utils/contentNegotiation");
const { userInfoValidation } = require("../../utils/userInfoValidation");

const { userDB } = require("../mockDatabase");

jest.mock("../../utils/userInfoValidation");
jest.mock("../../utils/contentNegotiation");

describe("User controller - testing", () => {
  describe("Get all users function testing", () => {
    it("should get a response from service", async () => {
      const req = {
        query: {
          offset: 0,
          limit: 3,
        },
      };

      const expectedResponse = {
        status: 200,
        message: userDB,
      };
      const res = {};
      const next = jest.fn();

      jest
        .spyOn(userService, "getAllUsers")
        .mockReturnValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await userController.getAllUsers(req, res, next);

      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);

      expect(response).toBe(expectedResponse);
    });

    it("should call the error handler", async () => {
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
        .spyOn(userService, "getAllUsers")
        .mockRejectedValueOnce(expectedError);

      await userController.getAllUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("getUserByUsername method", () => {
    it("should call service and return a response", async () => {
      const req = {
        params: {
          username: "arif",
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: userDB[0],
      };
      jest
        .spyOn(userService, "getUserDtoByUsername")
        .mockResolvedValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await userController.getUserByUsername(req, res, next);

      expect(userService.getUserDtoByUsername).toHaveBeenCalledWith(
        req.params.username
      );
      expect(userService.getUserDtoByUsername).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });

    it("should throws an error", async () => {
      const req = {
        params: {
          username: "testuser",
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error("Something went wrong");
      jest
        .spyOn(userService, "getUserDtoByUsername")
        .mockRejectedValueOnce(expectedError);

      await userController.getUserByUsername(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Update user method - testing", () => {
    it("should return a success response & updated data", async () => {
      const username = "arif";
      const password = "password";
      const req = {
        params: {
          username,
        },
        body: {
          password: password,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: userDB[0],
      };

      jest
        .spyOn(userService, "updateUser")
        .mockResolvedValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await userController.updateUser(req, res, next);

      expect(userService.updateUser).toHaveBeenCalledWith(
        req.params.username,
        password
      );

      expect(sendResponse).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedResponse);
    });
  });

  describe("Delete user - testing", () => {
    it("should return a success response", async () => {
      const username = "arif";
      const req = {
        params: {
          username,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: "User deleted successfully",
      };

      jest
        .spyOn(userService, "deleteUser")
        .mockResolvedValueOnce(expectedResponse);

      sendResponse.mockResolvedValue(expectedResponse);

      const response = await userController.deleteUser(req, res, next);

      expect(userService.deleteUser).toHaveBeenCalledWith(username);
      expect(response).toBe(expectedResponse);
    });
  });
});
