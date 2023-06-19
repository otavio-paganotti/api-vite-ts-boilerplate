import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import { logger } from '@config/winston';
import APIError from '@app/exceptions/APIError';
import config from '@config/vars';
import routes from '@start/routes';
import dbConfig from '@config/db';

// Define default HTTP logger instance (use default logger instance)
const winstonInstance = logger;

await dbConfig();

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({
  origin: ['*']
}));

// enable public static assets folder
app.use('/static', express.static('public'));

// this is really just a test output and should be the first thing you see
winstonInstance.info('The application is stating...');

// enable detailed API logging is dev env
if (config.env === 'dev') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
      winstonInstance,
      meta: true, // optional: log meta data about request (defaults to true)
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  }));
}

// get API version from .env (or else assume 1.0)
const baseURL = `/api/v${config.apiVersion}`;

// get routes from route directory
app.use(`${baseURL}`, routes);

// if error is not an instanceOf APIError, convert it.
app.use((err: expressValidation.ValidationError | APIError, _: Request, __: Response, next: NextFunction) => {
  if (err instanceof expressValidation.ValidationError) {
      // validation error contains errors which is an array of error each containing message[]
      // const unifiedErrorMessage = err.errors.map((error) => error.messages.join('. ')).join(' and ');
      const error = new APIError(err.details, err.statusCode, true);
      return next(error);
  } if (!(err instanceof APIError)) {
      const apiError = new APIError((err as APIError).message, (err as APIError).statusCode, (err as APIError).isPublic);
      return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((_, __, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance,
  }));
}

// error handler, send stacktrace only during development
app.use((err: APIError, _: Request, res: Response) => res.status(err.statusCode).json({
  message: err.isPublic ? err.message : httpStatus[err.statusCode],
  stack: config.env === 'dev' ? err.stack : {},
}));

export default app;
