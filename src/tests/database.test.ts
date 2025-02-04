import mongoose from "mongoose";
import DatabaseService from "../services/databaseService";
import { MONGO_URI } from "../lib/constants";

describe("Database Connection", () => {
  let dbService: DatabaseService;

  beforeEach(() => {
    dbService = new DatabaseService();
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it("successfully connects to the database", async () => {
    await dbService.connect();
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1);
  });
});
