import { Joi } from 'express-validation';

export const create = {
  body: Joi.object({
    email: Joi.string().required(),
  }),
};

export const update = {
  body: Joi.object({
    email: Joi.string().required(),
  }),
};
