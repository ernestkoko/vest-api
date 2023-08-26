import { Router } from 'express';
import {UserController} from '../app/controllers/userController';
import { body, validationResult } from 'express-validator';
const router = Router();

// Get all users
router.get('/', UserController.listAll);

router.post(
    '/',
    [
        body('username').isString().notEmpty(),
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),      
    ], 
    UserController.createUser
);

router.get('/:id/posts', UserController.getPost);

router.post('/:id/posts',
    [
        body('message').isString().notEmpty()      
    ], 
    UserController.createPost
);

router.get('/most-comments', UserController.getTopThreeUsersPostAndLatestComment);

export default router;