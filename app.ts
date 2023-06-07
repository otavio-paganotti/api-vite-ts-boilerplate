import { loggers } from 'winston';
import app from '@config/app';
import config from '@config/vars';

const logger = loggers.get(config.loggerName);

if (config.prod)
  app.listen(config.port, () => {
    logger.info(`The application has started on port ${config.port} (${config.env})`);
  });

export const viteNodeApp = app;
