import _ from 'lodash';
import os from 'os';
import pjson from '../../package.json';
import winston from 'winston';

type printf = (templateFunction: (info: winston.Logform.TransformableInfo) => string) => winston.Logform.Format;

export const developmentFormatter = (printf: printf) => printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

export const productionFormatter = (printf: printf) => printf((info) => {
  function parseInfo(infoObj: winston.Logform.TransformableInfo) {
    return _.omit(infoObj, [
      'err',
      'hostname',
      'level',
      'logger',
      'message',
      'meta',
      'service',
      'stack',
      'timestamp',
    ])
  };

  return JSON.stringify({
    service: pjson.name,
    logger: 'application_logger',
    hostname: os.hostname(),
    level: info.level,
    msg: info.message,
    meta: {
      service: {
        version: pjson.version,
      },
      logger: {
        time: info.timestamp,
      },
      event: parseInfo(info),
    },
    err: {
      err: info.err,
      stack: info.stack
    },
  });
});
