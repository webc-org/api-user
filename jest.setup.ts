import mongoose from "mongoose";
import { MONGO_URI } from "./src/lib/constants";

beforeAll(async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to test database successfully");
  } catch (error) {
    console.error("Error connecting to test database:", error);

    throw error;
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();

    console.log("Database connection closed successfully");
  } catch (error) {
    console.error("Error closing database connection:", error);

    throw error;
  }
});
