import app from "./app";
import "./src/config/databaseConfig";

const port = process.env.PORT || 9000;

const server = app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

process.on("unhandledRejection", (_) => {
  server.close(() => {
    process.exit(1); // shut down the app
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
