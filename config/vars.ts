import Joi from 'joi';

const schema = Joi.object({
  NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),

  VITE_APP_PORT: Joi.number().default(5000),
  VITE_API_VERSION: Joi.string().default('1').description('API Version'),
  VITE_JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),

  VITE_REDIS_CONNECTION: Joi.string().valid('local'),
  VITE_REDIS_HOST: Joi.string(),
  VITE_REDIS_PORT: Joi.number(),
  VITE_REDIS_PASSWORD: Joi.string().optional(),

  VITE_MONGO_INITDB_HOST: Joi.string().required(),
  VITE_MONGO_INITDB_PORT: Joi.number().default(27017),
  VITE_MONGO_INITDB_DATABASE: Joi.string().required(),
  VITE_MONGO_INITDB_USERNAME: Joi.string().default('root'),
  VITE_MONGO_INITDB_PASSWORD: Joi.string().default('root'),
}).unknown().required();

const {
  error,
  value
} = schema.validate(import.meta.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: value.NODE_ENV,
  port: value.VITE_APP_PORT,
  apiVersion: value.VITE_API_VERSION,
  jwtSecret: value.VITE_JWT_SECRET,
  prod: value.MODE === 'production',
  loggerName: '',
  logLevel: '',
  mongo: {
    url: `mongodb://${value.VITE_MONGO_INITDB_USERNAME}:${value.VITE_MONGO_INITDB_PASSWORD}@${value.VITE_MONGO_INITDB_HOST}:${value.VITE_MONGO_INITDB_PORT}/${value.VITE_MONGO_INITDB_DATABASE}`,
  }
};
