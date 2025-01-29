import { Request, Response } from "express";
import UserService from "../services/userService";

// UserController class to handle user-related requests
class UserController {
  private userService: UserService;

  // Constructor to initialize the UserService
  constructor(userService: UserService) {
    this.userService = userService;
  }

  // Signup method to handle user registration
  async signup(req: Request, res: Response): Promise<void> {
    const userData = req.body;
    try {
      const message = await this.userService.signup(userData);
      res.status(201).send(message); // Send success response with status 201
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(400).send((error as Error).message); // Send error response with status 400
    }
  }

  // Login method to handle user authentication
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const { token } = await this.userService.login(username, password);
      res.send({ token }); // Send the authentication token
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(400).send((error as Error).message); // Send error response with status 400
    }
  }

  // GetUser method to retrieve a user by ID
  async getUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.getUser(id);
      res.send(user); // Send the user data
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(400).send((error as Error).message); // Send error response with status 400
    }
  }

  // UpdateUser method to update user details
  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userData = req.body;
    try {
      const user = await this.userService.updateUser(id, userData);
      res.send(user); // Send the updated user data
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(400).send((error as Error).message); // Send error response with status 400
    }
  }

  // DeleteUser method to delete a user by ID
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const message = await this.userService.deleteUser(id);
      res.send(message); // Send the deletion confirmation message
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(400).send((error as Error).message); // Send error response with status 400
    }
  }
}

export default UserController;
