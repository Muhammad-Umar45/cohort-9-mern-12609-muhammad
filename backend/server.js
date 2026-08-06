const app = require("./src/app");
const { PORT } = require("./src/config/env");
const connectDB = require("./src/config/db");
const logger = require("./src/config/logger");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(
      {
        service: "server",
      },
      "Failed to start server",
    );
    logger.error(
      {
        service: "server",
      },
      error.message,
    );
  }
};

startServer();
