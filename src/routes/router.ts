import { Router as ExpressRouter } from "express";
import UserRoutes from "./userRoutes";

export default class Router {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();
    this.initializeViews(this.router);
    this.initializeRoutes(this.router);
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

  public getRouter(): ExpressRouter {
    return this.router;
  }
}
