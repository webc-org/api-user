import express, { Application } from "express";
import helmet from "helmet";
import Router from "./routes/router";
import DatabaseService from "./services/databaseService";

export default class App {
  private app: Application;
  private router: Router;
  private databaseService: DatabaseService;

  constructor() {
    this.app = express();
    this.databaseService = new DatabaseService();
    this.router = new Router();

    this.setupMiddleware();
    this.setupRoutes();
    this.setupViews();
  }

  private setupMiddleware(): void {
    // Security headers and protections
    this.app.use(helmet());

    // JSON payload parsing
    this.app.use(express.json());

    // URL-encoded data parsing (forms)
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.use(this.router.getRoutes());
  }

  private setupViews(): void {
    this.app.set("view engine", "ejs");
    this.app.set("views", "./src/views");
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
