import { Router } from 'express';
import { PostController } from '../app/controllers/postController';
import { body } from 'express-validator';
import { auth } from '../app/middleware/auth';
const router = Router();

router.post('/:postId/comments', 
    [
        body('message').isString().notEmpty(),
    ],
    auth,
    PostController.addCommentToPost
    );

export default router;