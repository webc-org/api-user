import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  // Method to handle user registration
  async signup(userData: any) {
    const user = new User(userData); // Create a new user instance with the provided data

    await user.save(); // Save the user to the database

    return "User created"; // Return a success message
  }

  // Method to handle user authentication
  async login(username: string, password: string) {
    const user = await User.findOne({ username }); // Find the user by username

    // If user is not found or password does not match, throw an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate a JWT token with the user ID as payload
    const token = jwt.sign({ id: user._id }, "secretkey");

    return { token }; // Return the generated token
  }

  // Method to retrieve a user by ID
  async getUser(id: string) {
    return User.findById(id).select("-password"); // Find the user by ID and exclude the password field
  }

  // Method to update user details
  async updateUser(id: string, userData: any) {
    return User.findByIdAndUpdate(id, userData, { new: true }).select(
      "-password"
    ); // Find the user by ID and update with new data, return the updated user excluding the password field
  }

  // Method to delete a user by ID
  async deleteUser(id: string) {
    await User.findByIdAndDelete(id); // Find the user by ID and delete

    return "User deleted"; // Return a success message
  }
}

export default UserService;
