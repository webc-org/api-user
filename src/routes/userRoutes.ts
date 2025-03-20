import { Router as ExpressRouter } from "express";
import UserController from "../controllers/userController";
import UserService from "../services/userService";
import AuthMiddleware from "../middleware/authMiddleware";

export default class UserRoutes {
  private userService: UserService;
  private userController: UserController;
  private authMiddleware: AuthMiddleware;

  constructor(private router: ExpressRouter) {
    this.userService = new UserService();
    this.userController = new UserController(this.userService);
    this.authMiddleware = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/user/signup",
      this.userController.signup.bind(this.userController)
    );

    this.router.post(
      "/user/login",
      this.userController.login.bind(this.userController)
    );

    this.router.get(
      "/user/:id", //
      this.authMiddleware.authenticate,
      (req, res) => this.userController.getUser(req, res)
    );

    this.router.put(
      "/user/:id", //
      this.authMiddleware.authenticate,
      (req, res) => this.userController.updateUser(req, res)
    );

    this.router.delete(
      "/user/:id", //
      this.authMiddleware.authenticate,
      (req, res) => this.userController.deleteUser(req, res)
    );
  }
}
