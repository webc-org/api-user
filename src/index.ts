import App from "./app";
import { PORT } from "./lib/constants";

const app = new App();

app.start(PORT);

process.on("SIGTERM", () => {
  app.stop();
});
