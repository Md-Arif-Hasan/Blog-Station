const authService = require("../../service/authService");
const userService = require("../../service/userService");
const { checkPassword } = require("../../utils/hashingPassword");
const { userDB } = require("../mockDatabase");

jest.mock("../../utils/hashingPassword.js");

describe("Auth service - testing", () => {
  describe("Register user method", () => {
    it("Should send user to repository", async () => {
      const User = {
        username: "arif",
        email: "arif@gmail.com",
        password: "12345",
      };

      const expectedResponse = {
        status: 200,
        message: userDB[0],
      };

      jest
        .spyOn(userService, "createUser")
        .mockReturnValueOnce(expectedResponse);

      const response = await authService.register(User);

      expect(userService.createUser).toBeCalledTimes(1);
      expect(userService.createUser).toBeCalledWith(User);
      expect(response).toBe(expectedResponse);
    });

    it("should throw an error if UserService.createUser throws an error", async () => {
      const User = {
        username: "arif",
        email: "arif@example.com",
        password: "12345",
      };
      const expectedError = new Error("Database error!");
      jest
        .spyOn(userService, "createUser")
        .mockRejectedValueOnce(expectedError);

      await expect(
        authService.register(User.username, User.email, User.password)
      ).rejects.toThrow(expectedError);
    });
  });

  describe("Login - testing", () => {
    it("Should return the user if user exists", async () => {
      const User = {
        username: "arif",
        password: "12345",
      };

      const existUser = {
        status: 200,
        message: userDB[0],
      };

      jest
        .spyOn(userService, "getUserByUsername")
        .mockReturnValueOnce(existUser);

      checkPassword.mockReturnValueOnce(true);

      const response = await authService.login(User);

      expect(userService.getUserByUsername).toBeCalledTimes(1);
      expect(userService.getUserByUsername).toBeCalledWith(User.username);
      expect(response).toEqual(existUser);
    });

    it("should throw error if password not matched", async () => {
      const User = {
        username: "arif",
        password: "123456",
      };

      const expectedResponse = {
        status: 200,
        message: userDB[0],
      };

      const expectedError = new Error("Your password isn't correct!");

      jest
        .spyOn(userService, "getUserByUsername")
        .mockReturnValueOnce(expectedResponse);

      checkPassword.mockResolvedValueOnce(false);

      await expect(authService.login(User)).rejects.toThrow(expectedError);
    });
  });
});
