const mongoose = require("mongoose");
const logger = require("./logger");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    logger.info(
  {
    service: "database",
  },
  "MongoDB connected successfully"
);
  } catch (error) {
    logger.error(
  {
    service: "database",
  },
  "Database Connection Failed"
);
    logger.error(
  {
    service: "database",
  },
  error.message
);

    process.exit(1);
  }
};

module.exports = connectDB;