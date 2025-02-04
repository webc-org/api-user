import mongoose from "mongoose";
import { mongoUri } from "./lib/constants";

beforeAll(async () => {
  try {
    await mongoose.connect(mongoUri);
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
