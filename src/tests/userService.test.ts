import UserService from "../services/userService";
import { MONGO_URI } from "../lib/constants";
import User from "../models/user";
import mongoose from "mongoose";

describe("UserService", () => {
  let userService: UserService;

  const testUserData = {
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    firstName: "Test",
    lastName: "User",
    address: "123 Test St",
    phone: "123-456-7890",
  };

  // Connect to the DB before running the tests
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    userService = new UserService();
  });

  // Close the MongoDB connection after running the tests
  afterAll(async () => {
    const testUser = await userService.getUserByEmail("testuser@example.com");

    const testUserId = testUser?._id;

    if (testUserId) {
      await userService.deleteUser(testUserId);
    }

    await mongoose.connection.close();
  });

  // Test case for creating a new user
  it("should create a new user", async () => {
    const testUser = await userService.getUserByEmail("testuser@example.com");

    const testUserId = testUser?._id;

    if (testUserId) {
      await userService.deleteUser(testUserId);
    }

    const message = await userService.signup(testUserData);

    expect(message).toBe("User created"); // Expect the signup method to return "User created"
  });

  // Test case for logging in a user
  it("should login a user", async () => {
    // Save the user to the database
    // await new User(testUserData).save();

    // Attempt to login with the saved user's credentials
    const { token } = await userService.login("testuser", "password123");

    expect(token).toBeDefined(); // Expect the login method to return a defined token
  });
});
