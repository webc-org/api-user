import User, { UserDocument } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  // Method to handle user registration
  async signup(userData: UserDocument) {
    // Create a new user instance with the provided data
    const user = new User(userData);

    // Save the user to the database
    await user.save();

    return "User created";
  }

  // Method to handle user authentication
  async login(username: string, password: string): Promise<{ token: string }> {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user is not found or password does not match, throw an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Generate a JWT token with the user ID as payload
    const token = jwt.sign({ id: user._id }, "secretkey");

    return { token }; // Return the generated token
  }

  // Method to retrieve a user by ID
  async getUserById(id: string): Promise<UserDocument | null> {
    // Find the user by ID and exclude the password field
    return User.findById(id).select("-password");
  }

  // Method to retrieve a user by email
  async getUserByEmail(email: string): Promise<UserDocument | null> {
    // Find the user by email
    return User.findOne({ email }).select("-password");
  }

  // Method to update user details
  async updateUser(id: string, userData: any): Promise<UserDocument | null> {
    // Find the user by ID and update with new data,
    // return the updated user excluding the password field
    return User.findByIdAndUpdate(id, userData, { new: true }).select(
      "-password"
    );
  }

  // Method to delete a user by ID
  async deleteUser(id: string): Promise<string> {
    await User.findByIdAndDelete(id); // Find the user by ID and delete

    return "User deleted"; // Return a success message
  }
}

export default UserService;
