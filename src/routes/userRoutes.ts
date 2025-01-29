import express from "express";
import UserController from "../controllers/userController";
import UserService from "../services/userService";
import authMiddleware from "../middleware/authMiddleware";

// Create a new router instance
const router = express.Router();

// Instantiate the UserService and UserController
const userService = new UserService();
const userController = new UserController(userService);

// Define the signup route
router.post("/signup", (req, res) => userController.signup(req, res));

// Define the login route
router.post("/login", (req, res) => userController.login(req, res));

// Define the get user route, protected by authMiddleware
router.get("/:id", authMiddleware, (req, res) =>
  userController.getUser(req, res)
);

// Define the update user route, protected by authMiddleware
router.put("/:id", authMiddleware, (req, res) =>
  userController.updateUser(req, res)
);

// Define the delete user route, protected by authMiddleware
router.delete("/:id", authMiddleware, (req, res) =>
  userController.deleteUser(req, res)
);

// Export the router to be used in other parts of the application
export default router;
