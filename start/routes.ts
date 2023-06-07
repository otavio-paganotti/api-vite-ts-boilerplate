import express from 'express';
import userRoutes from '@start/routes/users';
import '@start/routes/auth';

const Router = express.Router();

Router.use('/users', userRoutes);

export default Router;
