import { Joi } from 'express-validation';

export const create = {
  body: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().greater(0).required()
  }),
};

export const update = {
  body: Joi.object({
    email: Joi.string().optional(),
    name: Joi.string().optional(),
    age: Joi.number().integer().greater(0).optional()
  }),
};
