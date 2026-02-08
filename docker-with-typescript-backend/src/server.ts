import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import {errorLogger, logger} from "./app/src/shared/logger";

let server: Server;

async function main() {
  try {
    // await mongoose.connect("mongodb://mongodb:27017/project-1-learning-docker");
    await mongoose.connect(config.database_url as string); // many time error showing when image saved env file and env db_url = not cottasion
    console.log({ url: config.database_url});

    logger.info("✅ Connected to database");

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
      logger.info(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
    errorLogger.error(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  errorLogger.error(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  errorLogger.error("uncaughtException is detected");
  process.exit(1);
});
