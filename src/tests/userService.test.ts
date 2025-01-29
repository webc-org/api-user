import UserService from "../services/userService";
import { mongoUri } from "../lib/constants";
import User from "../models/user";
import mongoose from "mongoose";

describe("UserService", () => {
  let userService: UserService;

  // Connect to the MongoDB database before running the tests
  beforeAll(async () => {
    await mongoose.connect(mongoUri);

    userService = new UserService();
  });

  // Close the MongoDB connection after running the tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test case for creating a new user
  it("should create a new user", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      firstName: "Test",
      lastName: "User",
      address: "123 Test St",
      phone: "123-456-7890",
    };

    const message = await userService.signup(userData);

    expect(message).toBe("User created"); // Expect the signup method to return "User created"
  });

  // Test case for logging in a user
  it("should login a user", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      firstName: "Test",
      lastName: "User",
      address: "123 Test St",
      phone: "123-456-7890",
    };

    // Save the user to the database
    await new User(userData).save();

    // Attempt to login with the saved user's credentials
    const { token } = await userService.login("testuser", "password123");

    expect(token).toBeDefined(); // Expect the login method to return a defined token
  });
});
