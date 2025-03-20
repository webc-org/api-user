import UserService from "../services/userService";
import DatabaseService from "../services/databaseService";

describe("UserService", () => {
  let userService: UserService;
  let dbService: DatabaseService;

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
    dbService = new DatabaseService();
    userService = new UserService();

    await dbService.connect();
  });

  // Close the DB connection after running the tests
  afterAll(async () => {
    const testUser = await userService.getUserByEmail("testuser@example.com");

    const testUserId = testUser?._id;

    if (testUserId) {
      await userService.deleteUser(testUserId);
    }

    await dbService.disconnect();
  });

  // Test case for creating a new user
  it("should create a new user", async () => {
    const testUser = await userService.getUserByEmail("testuser@example.com");

    const testUserId = testUser?._id;

    if (testUserId) {
      await userService.deleteUser(testUserId);
    }

    const message = await userService.signup(testUserData);

    expect(message).toBe("User created");
  });

  // Test case for logging in a user
  it("should login a user", async () => {
    const { token } = await userService.login("testuser", "password123");

    expect(token).toBeDefined();
  });
});
