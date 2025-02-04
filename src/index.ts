import Server from "./server";

const PORT = Number(process.env.PORT) || 3000;
const server = new Server();
server.start(PORT);

// Handle graceful shutdown
process.on("SIGTERM", () => {
  server.stop();
});
