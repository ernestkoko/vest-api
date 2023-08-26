import { Router } from 'express';
import {UserController} from '../app/controllers/userController';
import { body, validationResult } from 'express-validator';
import { auth } from '../app/middleware/auth';
const router = Router();

// Get all users
router.get('/', auth, UserController.listAll);

router.post(
    '/',
    [
        body('username').isString().notEmpty(),
        body('email').isEmail(),
        body('password').isStrongPassword({minLength: 8}),      
    ], 
    UserController.createUser
);
router.post('/auth',[
    body('email').isString().notEmpty(),
    body('password').isString()     
], UserController.login);

router.get('/:id/posts',auth, UserController.getPost);

router.post('/:id/posts',
    [
        body('message').isString().notEmpty()      
    ], 
    auth,
    UserController.createPost
);

router.get('/most-comments', 
auth,
UserController.getTopThreeUsersPostAndLatestComment);

export default router;