import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../../lib/custom-errors";
import { PostService } from "../services/postService";
import { Comment } from "../models/entities/comment.entity";
import { validationResult } from "express-validator";

export class PostController {
    private static readonly postService: PostService = new PostService();
    public static addCommentToPost = async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const id = req.params.postId;
            if(!id){
                throw new BadRequestException('post id must be set');
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const postId = parseInt(id);
            const comment = req.body as Comment
            const data = await this.postService.addCommentToPost(postId,comment);
            return res.send(data);
        }catch(e){
            next(e);
        }
    }
}