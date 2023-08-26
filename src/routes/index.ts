import { Request, Response, Router } from 'express';
import user from './user';
import post from './post';
import { auth } from '../app/middleware/auth';

const routes = Router();

routes.use('/users', user);
routes.use('/posts', post);

export { routes };