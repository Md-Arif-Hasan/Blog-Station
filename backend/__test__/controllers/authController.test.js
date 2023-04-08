const authController = require("../../controllers/authController");
const authService = require("../../service/authService");
const { createJwtToken } = require("../../utils/JWTToken");
const { sendResponse } = require("../../utils/contentNegotiation");
const { userInfoValidation } = require("../../utils/userInfoValidation");
const { userDB } = require("../mockDatabase");

jest.mock("../../utils/JWTToken.js");
jest.mock("../../utils/contentNegotiation.js");
jest.mock("../../service/authService.js");
jest.mock("../../utils/userInfoValidation.js");

describe("Auth Controller - testing", () => {
  describe("Testing register function", () => {
    it("should call authService & return a new user", async () => {
      const req = {
        body: {
          username: "arif",
          email: "arif@gmail.com",
          password: "123457",
        },
      };

      const accesstoken = "token";
      const res = { cookie: jest.fn() };
      const next = jest.fn();

      const responseContentNegotiation = {
        success: true,
        user: userDB[0],
      };

      const expectedResponse = {
        status: 200,
        message: userDB[0],
      };

      userInfoValidation.mockReturnValueOnce(true);
      authService.register.mockResolvedValueOnce(expectedResponse);

      createJwtToken.mockReturnValueOnce(accesstoken);

      sendResponse.mockReturnValueOnce(responseContentNegotiation);

      const response = await authController.register(req, res, next);

      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(authService.register).toHaveBeenCalledWith(req.body);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledWith("jwt", accesstoken, {
        httpOnly: true,
      });
      expect(response).toEqual(responseContentNegotiation);
    });

    it("should send the error to middleware if authService throws an error", async () => {
      const req = {
        body: {
          username: "arif",
          email: "arif@gmail.com",
          password: "123456",
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new Error("Something went wrong!");

      userInfoValidation.mockReturnValueOnce(false);
      authService.register.mockRejectedValueOnce(expectedError);

      await authController.register(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("login", () => {
    it("should call login and return the user info", async () => {
      const req = {
        body: {
          Username: "arif",
          Password: "arif123",
        },
      };

      const accesstoken = "token";
      const res = { cookie: jest.fn() };
      const next = jest.fn();

      const expectedResponse = {
        status: 200,
        message: userDB[0],
      };

      const responseContentNegotiation = {
        success: true,
        user: userDB[0],
      };

      jest.spyOn(authService, "login").mockResolvedValueOnce(expectedResponse);

      createJwtToken.mockReturnValueOnce(accesstoken);
      sendResponse.mockReturnValueOnce(responseContentNegotiation);

      const response = await authController.login(req, res, next);

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(req.body);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledWith("jwt", accesstoken, {
        httpOnly: true,
      });
      expect(response).toEqual(responseContentNegotiation);
    });

    it("should send the error to error middleware if authService throws an error", async () => {
      const req = {
        body: {
          username: "arif",
          password: "123456",
        },
      };
      const res = {};
      const next = jest.fn();

      const expectedError = new Error("Something went wrong!");
      authService.login.mockRejectedValueOnce(expectedError);

      await authController.login(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
