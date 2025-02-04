import mongoose from "mongoose";
import { mongoUri } from "../lib/constants";

// DatabaseService: Handles all database connection operations
// Centralizes database management for better maintainability
export default class DatabaseService {
  // Establishes connection to MongoDB using the provided URI
  // Returns a Promise that resolves when connection is successful
  public async connect(): Promise<void> {
    await mongoose.connect(mongoUri);
  }

  // Gracefully closes the MongoDB connection
  // Important for clean application shutdown and testing
  public async disconnect(): Promise<void> {
    await mongoose.connection.close();
  }
}
