const app = require("./src/app");
const { PORT } = require("./src/config/env");
const connectDB = require("./src/config/db");
const logger = require("./src/config/logger");

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start HTTP server
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Handle server startup/runtime errors
    server.on("error", (error) => {
      logger.error(
        {
          service: "server",
          err: error,
        },
        "Failed to start server"
      );

      process.exit(1);
    });
  } catch (error) {
    logger.error(
      {
        service: "database",
        err: error,
      },
      "Failed to connect to database"
    );

    process.exit(1);
  }
};

startServer();
