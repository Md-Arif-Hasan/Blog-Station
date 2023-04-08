const userService = require("../../service/userService");
const userRepo = require("../../repository/userRepo");
const { hashingPassword } = require("../../utils/hashingPassword");

const { userDB } = require("../mockDatabase");

jest.mock("../../utils/hashingPassword.js");

describe("User service - testing", () => {
  describe("getAllUsers method - testing", () => {
    it("Should return a list of users", async () => {
      const offset = 0;
      const limit = 3;

      const Users = userDB;

      jest.spyOn(userRepo, "getAllUsers").mockResolvedValueOnce(Users);

      const response = await userService.getAllUsers(offset, limit);

      expect(userRepo.getAllUsers).toHaveBeenCalledWith(offset, limit);
      expect(response).toEqual({
        status: 200,
        message: Users,
      });
    });

    it("Should throw an error if the repository call fails", async () => {
      const offset = 0;
      const limit = 3;

      const fakeError = new Error("Internal server error");
      jest.spyOn(userRepo, "getAllUsers").mockRejectedValue(fakeError);

      await expect(userService.getAllUsers(offset, limit)).rejects.toThrow(
        fakeError
      );
    });

    it("Get no user in table - test", async () => {
      const offset = 0;
      const limit = 3;

      const fakeError = new Error("No user in users table!");
      jest.spyOn(userRepo, "getAllUsers").mockResolvedValue(0);
      await expect(userService.getAllUsers(offset, limit)).rejects.toThrow(
        fakeError
      );
    });
  });

  describe("getUserDtoByUsername method - testing ", () => {
    it("Should return a user", async () => {
      const username = "arif";
      const User = userDB[1];
      jest.spyOn(userRepo, "getUserByUsername").mockResolvedValueOnce(User);

      const response = await userService.getUserDtoByUsername(username);

      expect(userRepo.getUserByUsername).toHaveBeenCalledWith(username);
      expect(response).toEqual({
        status: 200,
        message: User,
      });
    });

    it("Should throw an error if the repository call fails", async () => {
      const username = "arif";
      const fakeError = new Error("Internal server error");
      jest.spyOn(userRepo, "getUserByUsername").mockRejectedValue(fakeError);

      await expect(userService.getUserByUsername(username)).rejects.toThrow(
        fakeError
      );
    });

    it("Username doesn't exist - test", async () => {
      const username = "arif";
      const fakeError = new Error("Username doesn't exist in database!");
      jest.spyOn(userRepo, "getUserByUsername").mockResolvedValue(0);
      await expect(userService.getUserByUsername(username)).rejects.toThrow(
        fakeError
      );
    });
  });

  describe("Update user method - testing", () => {
    it("Should update user password - testing", async () => {
      const username = "arif";
      const password = "arif123";
      const hashedPassword = "8fdvjfri3redrd23e4234";

      jest.spyOn(userRepo, "updateUser").mockResolvedValue([1]);
      hashingPassword.mockResolvedValueOnce(hashedPassword);
      const expectedResponse = {
        status: 200,
        message: "User updated successfully",
      };

      const response = await userService.updateUser(username, password);

      expect(hashingPassword).toHaveBeenCalledWith(password);
      expect(userRepo.updateUser).toHaveBeenCalledWith(
        username,
        hashedPassword
      );
      expect(response).toEqual(expectedResponse);
    });

    it("User doesn't exist - test", async () => {
      const password = "arif123";
      const hashedPassword = "8fdvjfri3redrd23e4234";
      hashingPassword.mockResolvedValueOnce(hashedPassword);

      const fakeError = new Error("User not found!");
      jest.spyOn(userRepo, "updateUser").mockResolvedValue(0);
      await expect(
        userService.updateUser(password, hashedPassword)
      ).rejects.toThrow(fakeError);
    });
  });

  describe("Delete user method - testing", () => {
    it("Should delete a specific user ", async () => {
      const username = "arif";

      jest.spyOn(userRepo, "deleteUser").mockResolvedValueOnce(1);

      const response = await userService.deleteUser(username);

      expect(userRepo.deleteUser).toHaveBeenCalledWith(username);
      expect(response).toEqual({
        status: 200,
        message: "User deleted successfully",
      });
    });

    it("Username doesn't exist - test", async () => {
      const username = "arif";
      const fakeError = new Error("User not found!");
      jest.spyOn(userRepo, "deleteUser").mockResolvedValue(0);
      await expect(userService.deleteUser(username)).rejects.toThrow(fakeError);
    });
  });
});
