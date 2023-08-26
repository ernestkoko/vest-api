import { Repository } from "typeorm";
import { Post } from "../models/entities/post.entity";
import { AppDatasoruce } from "./source";
import { Comment } from "../models/entities/comment.entity";
import { BadRequestException } from "../../lib/custom-errors";
import { User } from "../models/entities/user.entity";

export class PostService{
    private readonly postRepository: Repository<Post> =  AppDatasoruce.manager.getRepository(Post);
    private readonly commentRepository: Repository<Comment> =  AppDatasoruce.manager.getRepository(Comment);

    async addCommentToPost({postId, comment, authUser}:{postId: number, comment: Comment, authUser: AuthUser}): Promise<Comment>{
        const post = await this.postRepository.findOne({
            where:{
                id: postId
            }
        });
        if(!post) throw new BadRequestException('Post not found!');
        const user = await this.postRepository.manager.findOne(User,{
            where:{
                id: authUser.id
            }
        });
        if(!user) throw new BadRequestException('Something with wrong');
        comment.user = user;
        comment.post = post;
        const savedComment = await this.commentRepository.save(comment);
        return savedComment;
    }
}