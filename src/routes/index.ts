import { Request, Response, Router } from 'express';
import user from './user';
import post from './post';

const routes = Router();

routes.use('users', user);
routes.use('posts', post);

export { routes };