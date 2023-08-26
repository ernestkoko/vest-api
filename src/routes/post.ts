import { Router } from 'express';
import { PostController } from '../app/controllers/postController';
import { body } from 'express-validator';
const router = Router();

router.post('/:postId/comments', 
    [
        body('message').isString().notEmpty(),
    ],
    PostController.addCommentToPost
    );

export default router;