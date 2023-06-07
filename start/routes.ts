import express from 'express';
import userRoutes from '@start/routes/users';

const Router = express.Router();

Router.use('/users', userRoutes);

export default Router;
