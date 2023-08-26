import { Repository } from "typeorm";
import { Post } from "../models/entities/post.entity";
import { AppDatasoruce } from "./source";
import { Comment } from "../models/entities/comment.entity";
import { BadRequestException } from "../../lib/custom-errors";

export class PostService{
    private readonly postRepository: Repository<Post> =  AppDatasoruce.manager.getRepository(Post);
    private readonly commentRepository: Repository<Comment> =  AppDatasoruce.manager.getRepository(Comment);

    async addCommentToPost(postId: number, comment: Comment): Promise<Comment>{
        const post = await this.postRepository.findOne({
            where:{
                id: postId
            }
        });
        if(!post) throw new BadRequestException('Post not found!');
        comment.post = post;
        const savedComment = await this.commentRepository.save(comment);
        return savedComment;
    }
}