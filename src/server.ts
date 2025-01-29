import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import { mongoUri } from "./lib/constants";

// Create an instance of Express
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB using the provided URI
mongoose.connect(mongoUri);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "connection error:"));

// Bind connection to open event (to get notification of successful connection)
db.once("open", () => console.log("Connected to MongoDB"));

// Use the user routes for any requests to /api/users
app.use("/api/users", userRoutes);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
