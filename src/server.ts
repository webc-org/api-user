import express, { Application } from "express";
import DatabaseService from "./services/databaseService";
import Router from "./routes/router";

export default class Server {
  private app: Application;
  private databaseService: DatabaseService;
  private router: Router;

  constructor() {
    this.app = express();
    this.databaseService = new DatabaseService();
    this.router = new Router();

    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.use(this.router.getRouter());
  }

  public async start(port: number): Promise<void> {
    await this.databaseService.connect();

    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  public async stop(): Promise<void> {
    await this.databaseService.disconnect();
  }
}
