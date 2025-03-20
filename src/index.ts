import Server from "./server";
import { PORT } from "./lib/constants";

const server = new Server();

server.start(PORT);

process.on("SIGTERM", () => {
  server.stop();
});
