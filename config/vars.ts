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
  prod: value.NODE_ENV === 'production',
  loggerName: '',
  logLevel: ''
};
