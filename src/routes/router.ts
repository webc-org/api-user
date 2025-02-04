import { Router as ExpressRouter } from "express";
import UserRoutes from "./userRoutes";

export default class Router {
  private router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter();

    this.initializeRoutes(this.router);
  }

  private initializeRoutes(apiRouter: ExpressRouter): void {
    new UserRoutes(apiRouter);

    this.router.use("/api", apiRouter);
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }
}
