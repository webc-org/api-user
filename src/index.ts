import Server from "./server";
import { PORT } from "./lib/constants";

const server = new Server();
server.start(PORT);

console.log("Starting server...");

process.on("exit", (code) => {
  console.log(`Process exiting with code: ${code}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("SIGTERM", () => {
  server.stop();
});
