import express from 'express';
import { expressjwt } from 'express-jwt';
import userCtrl from '@ctrl/http/users';
import { create, update } from '@validations/users';
import { validate } from 'express-validation';
import config from '@config/vars';

const Router = express.Router();

const user = new userCtrl();

Router.route('/')
  .get(
    expressjwt({
      secret: config.jwtSecret,
      algorithms: ['HS512']
    }),
    user.list
  )
  .post(
    validate(create, {
      context: false,
      keyByField: true,
      statusCode: 400
    }, {}),
    user.create
  );

Router.route('/:userId')
  .get(
    expressjwt({
      secret: config.jwtSecret,
      algorithms: ['HS512']
    }),
    user.get
  )
  .post(
    validate(update, {
      context: false,
      keyByField: true,
      statusCode: 400
    }, {}),
    user.update
  )
  .delete(
    expressjwt({
      secret: config.jwtSecret,
      algorithms: ['HS512']
    }),
    user.delete
  );

Router.param('userId', user.load);

export default Router;
