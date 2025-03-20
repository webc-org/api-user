import { Router as ExpressRouter } from "express";
import UserRoutes from "./userRoutes";

export default class Router {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
    this.initializeRoutes(this.router);

    // ADD EJS VIEWS
    this.initializeViews(this.router);
  }

  private initializeViews(apiRouter: ExpressRouter): void {
    apiRouter.get("/login", (req, res) => {
      res.render("login");
    });

    apiRouter.get("/signup", (req, res) => {
      res.render("signup");
    });
  }

  private initializeRoutes(apiRouter: ExpressRouter): void {
    new UserRoutes(apiRouter);

    this.router.use("/api", apiRouter);
  }

  public getRoutes(): ExpressRouter {
    return this.router;
  }
}
