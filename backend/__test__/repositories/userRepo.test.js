const userRepository = require("../../repository/userRepo");
const User = require("../../models/userModel");
const { userDB } = require("../mockDatabase");

class createUser {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = "2023-03-31T06:35:31.000Z";
    this.updatedAt = "2023-03-31T06:35:31.000Z";
  }
}

describe("User repo testing", () => {
  describe("Get allUsers testing", () => {
    it("all users arrary will be returned", async () => {
      const offset = 0;
      const limit = 3;
      jest.spyOn(User, "findAll").mockImplementation(({ offset, limit }) => {
        return userDB.slice(offset, offset + limit);
      });

      const response = await userRepository.getAllUsers(offset, limit);

      expect(User.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          offset,
          limit,
        })
      );
      expect(response.length).toBe(limit);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            username: expect.any(String),
            email: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ])
      );
    }),
      it("should throw an error if database query fails", async () => {
        const offset = 0;
        const limit = 4;
        const error = new Error("Error occured!");
        jest.spyOn(User, "findAll").mockRejectedValueOnce(error);

        await expect(userRepository.getAllUsers(offset, limit)).rejects.toThrow(
          error
        );
      });
  });

  describe("Get user by username - testing", () => {
    it("A user object should be returned", async () => {
      const username = "arif";
      const expectedResult = { ...userDB[0] };

      jest.spyOn(User, "findOne").mockResolvedValueOnce(expectedResult);

      const response = await userRepository.getUserByUsername(username);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(response).toEqual(expectedResult);
    });

    it("should throw an error if database query fails", async () => {
      const username = "expecarifteduser";
      const error = new Error("Error occured in database!");
      jest.spyOn(User, "findOne").mockRejectedValueOnce(error);

      await expect(userRepository.getUserByUsername(username)).rejects.toThrow(
        error
      );
    });
  });

  describe("Create user - testing", () => {
    it("Created user should be returned", async () => {
      const id = "12345";
      const username = "arif";
      const email = "arif@gmail.com";
      const password = "password";
      const expectedUser = { id, username, email, password };

      jest
        .spyOn(User, "create")
        .mockImplementation((user) => new createUser(user));

      const response = await userRepository.createUser(
        id,
        username,
        email,
        password
      );

      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith({
        id,
        username: username.toLowerCase(),
        email,
        password,
      });
      expect(response).toEqual(expect.objectContaining(expectedUser));
    });

    it("should throw an error if database query fails", async () => {
      const id = "12345";
      const username = "arif";
      const email = "arif@gmail.com";
      const password = "password";
      const error = new Error("Error occured!");
      jest.spyOn(User, "create").mockRejectedValueOnce(error);

      await expect(
        userRepository.createUser(id, username, email, password)
      ).rejects.toThrow(error);
    });
  });

  describe("Delete user by username function - testing", () => {
    it("A user should be deleted", async () => {
      const username = "expecteduser";

      jest.spyOn(User, "destroy").mockResolvedValueOnce(1);

      const response = await userRepository.deleteUser(username);

      expect(User.destroy).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(response).toBe(1);
    });

    it("In case no user exist, return 0", async () => {
      const username = "arif";

      jest.spyOn(User, "destroy").mockResolvedValueOnce(0);

      const response = await userRepository.deleteUser(username);

      expect(User.destroy).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(response).toBe(0);
    });

    it("should throw an error if database query fails", async () => {
      const username = "arif";
      const error = new Error("Error occured!");
      jest.spyOn(User, "destroy").mockRejectedValueOnce(error);

      await expect(userRepository.deleteUser(username)).rejects.toThrow(error);
    });
  });

  describe("Check user email- testing", () => {
    it("A user should be returned", async () => {
      const email = "arif@gmail.com";
      const expectedResult = { ...userDB[0] };

      jest.spyOn(User, "findOne").mockResolvedValueOnce(expectedResult);

      const response = await userRepository.checkEmail(email);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: email },
      });
      expect(response).toEqual(expectedResult);
    });

    it("Should throw an error if database query fails", async () => {
      const email = "arif@gmail.com";
      const error = new Error("Error occured!");
      jest.spyOn(User, "findOne").mockRejectedValueOnce(error);

      await expect(userRepository.checkEmail(email)).rejects.toThrow(error);
    });
  });

  describe("Update user function - testing ", () => {
    it("It should update a user", async () => {
      const username = "arif";
      const password = "arif123";
      jest.spyOn(User, "update").mockResolvedValueOnce([]);

      const user = await userRepository.updateUser(username, password);

      expect(User.update).toHaveBeenCalledWith(
        { password },
        { where: { username: username.toLowerCase() } }
      );
    });

    it("return false if user doesnt exits", async () => {
      const username = "arifhasan";
      const password = "arif123";
      jest.spyOn(User, "update").mockResolvedValueOnce([0]);

      const user = await userRepository.updateUser(username, password);

      expect(User.update).toHaveBeenCalledWith(
        { password },
        { where: { username: username.toLowerCase() } }
      );
      expect(user[0]).toBe(0);
    });

    it("should throw an error if there is an error in the database", async () => {
      const username = "arif";
      const password = "arif123";
      const expectedError = new Error("Database error occured!");
      jest.spyOn(User, "update").mockRejectedValueOnce(expectedError);

      await expect(
        userRepository.updateUser(username, password)
      ).rejects.toThrow(expectedError);
    });
  });
});
