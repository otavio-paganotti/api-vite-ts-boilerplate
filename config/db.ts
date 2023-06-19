import mongoose from "mongoose";
import config from "@config/vars";
import { logger } from '@config/winston';

export default () => new Promise(async (resolve, reject) => {
  logger.info(`MongoDB URL: ${config.mongo.url}`);

  return mongoose.connect(config.mongo.url)
    .then((res) => {
      logger.info("Connected to MongoDB");

      resolve(res);
    })
    .catch((e) => {
      logger.error("Error to connect to MongoDB");
      logger.error(e);

      reject();
    });
});
