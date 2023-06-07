import { loggers } from "winston";
import config from '@config/vars';
import createLoggerWithOptions from '@config/winston/loggers-container-accessor';

export interface LoggerOptions {
  name: string;
  env: 'development' | 'production' | 'test',
  logLevel: string;
}

const loggerOptions: LoggerOptions = {
  name: config.loggerName,
  env: config.env,
  logLevel: config.logLevel
};

createLoggerWithOptions(loggerOptions);

const logger = loggers.get(config.loggerName);

export default logger;
